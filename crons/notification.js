var cron = require('node-cron');
const TransactionWorkflow = require("../models/client/huddle/transactionWorkFlow");
const Client = require("../models/product/client");
const User = require("../models/client/userManagement/user");
let redisNotification = require("redis").createClient();
const transactionManager = require("../managers/transaction.manager");
const Notifications = require("../models/client/huddle/notification");
let _ = require('lodash');
// 00 00 00 * * * ---for every midnight at 12:00 am
// 00 */1 * * * * --Executes every 1 minute
//00 */3 * * * *  --Executes in every 3 seconds

//running at every midnight at 12:00 am
cron.schedule('00 00 00 * * *', async () => {
    console.log('running at every midnight at 12:00 am');
    let clients = await Client.getModel().find({});
    clients.forEach(async (client) => {
        let clientWorkflow = await TransactionWorkflow.getModel(client.subdomain).find({});
        clientWorkflow.forEach(async (workflow) => {
            workflow.tasks.forEach(async (task) => {
                if (task.dueDate && getDueDate(new Date(task.dueDate)) == getTomorrow()) {
                    console.log('matched date');
                    await transactionManager.notifyTaskAssign(client.subdomain, task, workflow.transactionId);
                }
            });
        });
    });
});

// get the tomorrow date in form of mm/dd/yyyy
function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return `${tomorrow.getFullYear()}/${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`;
}

// get the due date of task in form of mm/dd/yyyy
function getDueDate(dueDate) {
    dueDate.setDate(dueDate.getDate());
    return `${dueDate.getFullYear()}/${dueDate.getMonth() + 1}/${dueDate.getDate()}`;
}



cron.schedule('00 00 00 * * *', async () => {
    console.log('running at every midnight at 12:00 am');
    let clients = await Client.getModel().find({});
    clients.forEach(async (client) => {
        let Users = await User.getModel(client.subdomain).find({});
        Users.forEach(async (user) => {
            redisNotification.get(user._id.toString(), async function (error, notifications) {
                if (error) {
                    console.log('error at user Connected', error);
                }
                if (!!notifications) {
                    let value = JSON.parse(notifications);
                    //Insert all the seen notification to client's database.
                    let promise = value.map(async (notification) => {
                        if (!_.isEmpty(notification)) {
                            if (notification.seen) {
                                let notificationModel = Notifications.getModel(client.subdomain);
                                let isNotificationExist = await notificationModel.findOne({ key: user._id });
                                if (isNotificationExist) {
                                    await notificationModel.updateOne({
                                        key: user._id,
                                        $push: { list: notification }
                                    });
                                } else {
                                    let obj = {
                                        key: user._id,
                                        list: [notification]
                                    }
                                    let notificationData = new notificationModel(obj);
                                    await notificationData.save();
                                }
                                return null;
                            } else {
                                return notification
                            }
                        }
                        return;
                    })
                    let UnseenNotification = await Promise.all(promise);
                    let data = UnseenNotification.filter(a => a != null);
                    if (data.length > 0) {
                        redisNotification.set(user._id.toString(), JSON.stringify(data));
                    }
                }
            })
        });
    });
})


