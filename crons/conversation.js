var cron = require('node-cron');
let redisChat = require("redis").createClient();
let Conversation = require('../models/client/huddle/conversation')
let _ = require('lodash')
let Logger = require('../config/logger')
/**
 * Schedule cron to move chats to mongodb every midnight: i.e 12 am
 */
// (*/5 * * * * *) - in every 5 seconds.

cron.schedule('00 00 00 * * *', () => {
    try {
        redisChat.keys('*', async (err, keys) => {
            if (err) return console.log(err);
            if (keys) {
                /**
                 * Filter the keys which are prefixed for conversation
                 */
                let roomIds = keys.filter(key => key.includes('conv-'));
                if (roomIds.length > 0) {
                    let fetchPromise = roomIds.map(async (roomId) => {
                        let value = {};
                        return new Promise((resolve) => {
                            redisChat.get(roomId, (e, reply) => {
                                if (reply) {
                                    value = JSON.parse(reply);
                                }
                                resolve({ chats: value, roomId: roomId })
                            })
                        })
                    });
                    let cachedRoomsConversations = await Promise.all(fetchPromise);

                    /**
                     * Insert all the seen conversations to client's database.
                     */
                    let insertionPromise = cachedRoomsConversations.map(async (chatRoom) => {

                        let chatInsertionPromise = chatRoom.chats.map(async (chat, i, array) => {
                            if (chat.seen.every(s => s.seen)) {
                                let conversationModel = Conversation.getModel(chatRoom.roomId.split('-')[0]);
                                let conversation = new conversationModel(chat);
                                await conversation.save()
                                array.splice(i, 1);
                            }
                            return;
                        })
                        await Promise.all(chatInsertionPromise)
                        await saveUnseenChats(chatRoom.chats, chatRoom.roomId);
                        return;
                    })
                    await Promise.all(insertionPromise);
                    Logger.log('Cron Process Executed for transferring cached conversations from Redis Database to mongoDb.\n' + `Date : ${new Date().toString()}`)
                }
            }
        });
    } catch (error) {
        Logger.log(`CRON JOB : An error occurred while moving the cached conversations: Date : ${new Date().toString()}\n`, error, 'CronSchedule')
    }
})

async function saveUnseenChats(chats, roomId) {
    return new Promise((resolve) => {
        redisChat.set(roomId, JSON.stringify(chats), (e, r) => {
            resolve(true);
        })
    })
}