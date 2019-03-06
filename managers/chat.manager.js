
let ChatRoom = require("../models/client/huddle/chatRoom")
let common = require("../util/common")
let Contact = require('../models/client/common/contact')
let User = require('../models/client/userManagement/user')
let ResponseMessage = require('../util/responseMessages')
let Conversation = require('../models/client/huddle/conversation')
let redisChat = require("redis").createClient()
const Logger = require("../config/logger")

module.exports.getRoomId = async function (roomDetails, subdomain) {
    try {
        let isNewRoom = false
        let newChatRoom = {}
        /**
         * Fetch Administrator's details.
         */
        let admin = await User.getModel(subdomain).findOne({ head: true })
        /**
         * Replace the role ids with the user ids from
         * users collection using email from users collection
         */
        let roleIds = roomDetails.roleIds
        let ContactModel = Contact.getModel(subdomain)
        let UserModel = User.getModel(subdomain)

        let userFetchPromise = roleIds.map(async (roleId) => {
            let contact = await ContactModel.findOne({ 'role.id': roleId })
            let user = await UserModel.findOne({ email: contact.persons[0].email })
            return { id: user._id }
        })
        let users = await Promise.all(userFetchPromise)
        /**
         * Find if the admin's id exist in the chat room.
         * If it does not exist, push the name & id. 
         * This way the admin will have access to conversation.
         */
        if (!users.find(user => user.id == admin._id)) {
            let adminUser = { id: admin._id }
            users.push(adminUser)
        }

        // if the room is already created for these number of users then lets not create the new room but use the old one.
        // get the room Id for the users and send back to the client. Save room id along with users and taskIds.
        let roomId = ""
        let chatRoomModel = ChatRoom.getModel(subdomain)
        let chatRooms = await chatRoomModel.find({ transactionId: roomDetails.transactionId })

        let chatRoomObj = chatRooms.find(chatRoom => (chatRoom.users.length === users.length) && hasSameUsers(chatRoom.users, users))
        /**
         * check if the room already exists.
         */
        if (chatRoomObj) {
            let tasks = chatRoomObj.tasks
            let taskExist = tasks.find(task => task.taskId == roomDetails.task.taskId.toString())
            if (!taskExist) {
                tasks.push(roomDetails.task)
            }

            await chatRoomModel.updateOne({ roomId: chatRoomObj.roomId }, { $set: { tasks: tasks } })
            roomId = chatRoomObj.roomId
        }
        else {

            isNewRoom = true

            // Generate room id for conversation perfixed with subdomain name and `conv`
            roomId = `${subdomain}-conv-${common.generateObjectId()}`

            // first time creating room for it, lets save.
            let tasks = new Array(roomDetails.task)
            newChatRoom = { roomId: roomId, tasks: tasks, roomName: roomDetails.roomName, users: users, transactionId: roomDetails.transactionId }
            let chatRoom = new chatRoomModel(newChatRoom)
            await chatRoom.save()
        }
        return { code: 200, data: { roomId: roomId, isNewRoom: isNewRoom, room: isNewRoom ? newChatRoom : {} } }
    } catch (error) {
        Logger.log('Error while fetching room Id', error, 'getRoomId')
        return { code: 500, message: ResponseMessage.TryLater }
    }
}

module.exports.getRooms = async function (transactionId, userId, subdomain) {
    /**
     * Get the rooms associated to a particular user
     */
    try {
        let chatRoomModel = ChatRoom.getModel(subdomain)
        let rooms = await chatRoomModel.find({ transactionId: transactionId }).lean()
        let filteredRooms = []
        let filterPromise = rooms.map(async (room, i, array) => {
            if (room.users.find(user => user.id == userId)) {
                /**
                 * The profile image and user's first name & last name, fetch update the latest details
                 * so incase if the name/profile image is changed it will be the latest on ui.
                 */
                let userEditPromise = room.users.map(async (user, index, users) => {
                    let userData = await User.getModel(subdomain).findOne({ _id: user.id })
                    // console.log(userData._id == userId);

                    users[index]['imagePath'] = userData.imageInfo ? userData.imageInfo.imageName : null;
                    users[index]['name'] = userData.firstName + ' ' + userData.lastName;
                    return users[index]
                })
                array[i].users = await Promise.all(userEditPromise);
                return array[i];
            } else {
                array.splice(i, 1)
            }
        })

        filteredRooms = await Promise.all(filterPromise)
        filteredRooms = filteredRooms.filter(room => !!room)
        return { code: 200, data: filteredRooms }
    } catch (error) {
        Logger.log('Error while fetching rooms', error, 'getRooms')
        return { code: 500, message: ResponseMessage.TryLater }
    }
}

/**
 * Function to figure out if two arrays have exactly same length and elements.
 * Only applicable for `chatRoom`
 */
function hasSameUsers(collArr, newArr) {
    if (collArr.length !== newArr.length) return false
    collArr = collArr.sort((a, b) => { return a.id > b.id })
    newArr = newArr.sort((a, b) => { return a.id > b.id })
    for (let i = 0; i < collArr.length; i++) {
        if (collArr[i].id.toString() !== newArr[i].id.toString()) return false
    }
    return true
}


module.exports.getConversations = function (roomId, taskId, page, subdomain) {
    return new Promise((resolve, reject) => {
        try {
            const limit = 12
            let ConversationModel = Conversation.getModel(subdomain)

            redisChat.get(roomId, async (error, data) => {
                if (error) reject({ code: 500, message: ResponseMessage.TryLater })
                /**
                 * Get the cached chats if exists.
                 */
                let cachedChats = data ? JSON.parse(data).filter(d => d.taskId == taskId) : []

                /**
                 * Get the cached chats if they satisfy the data rquirement length 
                 */
                if (cachedChats.length >= (page * limit)) {
                    resolve({ code: 200, data: cachedChats.slice(-(page * limit)) })
                }

                /**
                 * If there exists cached chats but not upto the limit,
                 * then fulfill by fetching the remaining from backed up chats from 
                 * mongodb.
                 */
                if (cachedChats.length < (page * limit)) {
                    // Calculate required data length.
                    let requiredLimit = (page * limit) - cachedChats.length
                    let remainingChats = await ConversationModel.find({ taskId: taskId }).limit(requiredLimit)
                    resolve({ code: 200, data: cachedChats.concat(remainingChats) })
                }

                /**
                 * If there are no cached chats then fetch from mongodb.
                 */
                if (cachedChats.length == 0) {
                    let movedChats = await ConversationModel.find({ taskId: taskId }).limit(page * limit)
                    resolve({ code: 200, data: movedChats })
                }
            })
        } catch (error) {
            Logger.log('Error while fetching conversations', error, 'getConversations')
            reject({ code: 500, message: ResponseMessage.TryLater })
        }
    })
}