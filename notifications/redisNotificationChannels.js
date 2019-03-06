let socket = require('socket.io-client')('http://localhost:4000');
let redisPub = require("redis").createClient();
let notificationTypes = require("./notificationTypes");
const generateObjectId = require('../util/common').generateObjectId;

module.exports.clientAdded = async function (subscribedModules, subdomain) {
    // It is used to tell RealTime server.
    try {
        // console.log('in clientAddedmethod data..', subscribedModules, subdomain);
        socket.emit('clientAdded', { name: subdomain, subscribedModules: subscribedModules });
    } catch (error) {

    }
}
/**
 *  Redis PUBLISH command posts a message to a channel.
    here subdomain:moduleId is the channel and JSON.stringify(notification) is the message
 */
module.exports.netSheetGenerated = function (subdomain,netSheetGeneratedDate,userIds) {
    let notification = extractNotification("NetSheetGenerated");
    notification.id = generateObjectId();
    notification.userIds = new Array();
    notification.userIds = userIds;
    notification.data = { netSheetGeneratedDate: netSheetGeneratedDate };
    redisPub.publish(subdomain + ":" + notification.module, JSON.stringify(notification));
}

module.exports.serviceRequested = async function (subdomain, orderNumber, orderType, userIds) {
    let notification = extractNotification("ServiceRequested");
    notification.id = generateObjectId();
    notification.userIds = new Array();
    notification.userIds = userIds;
    notification.data = { orderNumber: orderNumber };
    notification.message = `A ${orderType} Service has been requested`;

    redisPub.publish(subdomain + ":" + notification.module, JSON.stringify(notification));
}

module.exports.requestedServiceProcessed = function (subdomain, userIds, transactionId) {
    let notification = extractNotification("ServiceRequestProcessed");
    notification.id = generateObjectId();
    notification.userIds = new Array();
    notification.userIds = userIds;
    notification.data = { transactionId: transactionId };
    redisPub.publish(subdomain + ":" + notification.module, JSON.stringify(notification));
}


module.exports.formTaskAssigned = async function (subdomain, taskId, taskName, action, componentType, formId, transactionId, userIds) {
    let notification = extractNotification("FormTaskAssigned");
    notification.id = generateObjectId();
    notification.userIds = new Array();
    notification.userIds.push(userIds);
    notification.data = { taskId: taskId, transactionId: transactionId, viewMode: false, action: action, componentType: componentType, formId: formId };
    notification.message = `A ${taskName} task has been assigned to you`;
    redisPub.publish(subdomain + ":" + notification.module, JSON.stringify(notification));
}

module.exports.FormTaskSubmitted = async function (subdomain,transactionId, taskId, userName, taskName, action,componentType,formId,userIds) {
    let notification = extractNotification("FormTaskSubmitted");
    notification.id = generateObjectId();
    notification.userIds = new Array();
    notification.userIds = userIds;
    notification.data = { taskId: taskId, transactionId: transactionId ,viewMode:true,action:action,componentType:componentType,formId:formId};
    notification.message = `${userName} has completed the ${taskName} task`;
    
    redisPub.publish(subdomain + ":" + notification.module, JSON.stringify(notification));
}

module.exports.calendarTaskAssigned = async function(subdomain, taskId, taskName, action, componentType, transactionId, userIds){
   
    
    let notification = extractNotification("calendarTaskAssigned");
    notification.id = generateObjectId();
    notification.userIds = new Array();
    notification.userIds.push(userIds);
    notification.data = { taskId: taskId, transactionId: transactionId, viewMode: false, action: action, componentType: componentType};
    notification.message = `A ${taskName} task has been assigned to you`;

    // console.log('in calendarTaskAssign redis',notification );

    redisPub.publish(subdomain + ":" + notification.module, JSON.stringify(notification));
};

module.exports.calendarTaskSubmit = async function(subdomain,transactionId, taskId, userName, taskName, action,componentType,userIds,replyData){
    
    // var index = userIds.indexOf(replyData.loggedUser);
    let  index=-1,idx=-1;
    /* TODO:- need to modified index value find */
    userIds.forEach(x=>{
      idx++;
      if(x==replyData.loggedUser){    
        index=idx;
      }
    })
     if (index > -1) {
       userIds.splice(index, 1);
    }
    // console.log('index.ggg....', index,userIds);

    let notification = extractNotification("calendarTaskSubmit");
    notification.id = generateObjectId();
    notification.userIds = new Array();
    notification.userIds = userIds;
    notification.data = { taskId: taskId, transactionId: transactionId ,viewMode:true,action:action,componentType:componentType};
    if(replyData.answer){
      notification.message = `${replyData.loggedUserName} has  ${replyData.status} the ${taskName} task`;
    }
    else{
        notification.message = `${userName} has created the ${taskName} task`;
    } 
    redisPub.publish(subdomain + ":" + notification.module, JSON.stringify(notification));;
};

module.exports.DocumentTaskAssigned = async function (subdomain, taskId, documentName, action, componentType, transactionId, userIds) {
    let notification = extractNotification("DocumentTaskAssigned");
    notification.id = generateObjectId();
    notification.userIds = new Array();
    notification.userIds.push(userIds);
    notification.data = { taskId: taskId, transactionId: transactionId, viewMode: false, action: action, componentType: componentType }
    notification.message = `You need to submit the following ${documentName} `
    redisPub.publish(subdomain + ":" + notification.module, JSON.stringify(notification));
}

module.exports.DocumentTaskSubmitted = function (subdomain, taskId, userName, documentName,action,componentType,transactionId, userIds) {
    let notification = extractNotification("DocumentTaskSubmitted");
    notification.id = generateObjectId();
    notification.userIds = new Array();
    notification.userIds = userIds;   
    notification.data = {taskId: taskId, transactionId: transactionId ,viewMode:true,action:action,componentType:componentType};
    notification.message = `${userName} has uploaded following document ${documentName}`
    redisPub.publish(subdomain + ":" + notification.module, JSON.stringify(notification));
}

module.exports.ClosingScheduled = function (subdomain, transactionNumber, transactionId, closingDateTime, closingLocationSummary, taskId, userIds) {
    let notification = extractNotification("ClosingScheduled");
    notification.id = generateObjectId();
    notification.userIds = new Array();
    notification.userIds = userIds;
    notification.data = { transactionId: transactionId, transactionNumber: transactionNumber, taskId: taskId };
    notification.message = `Closing for ${transactionNumber} is scheduled on ${closingDateTime} at ${closingLocationSummary}`;
    redisPub.publish(subdomain + ":" + notification.module, JSON.stringify(notification));
}

module.exports.UserRegistered = function (subdomain, userName, transactionId, transactionNumber, taskId, userIds) {
    let notification = extractNotification("UserRegistered");
    notification.id = generateObjectId();
    notification.userIds = new Array();
    notification.userIds = userIds;
    notification.data = { transactionId: transactionId, transactionNumber: transactionNumber, taskId: taskId };
    notification.message = `${userName} has registered on TTD for collaboration on transaction ${transactionNumber}`
    redisPub.publish(subdomain + ":" + notification.module, JSON.stringify(notification));
}

function extractNotification(notificationType) {
    return notificationTypes.NotificationTypes.find(element => element.type == notificationType);
}
