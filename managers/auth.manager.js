const User = require("../models/client/userManagement/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserGroup = require('../models/client/userManagement/userGroup')
const Role = require('../models/client/userManagement/role')
const LoginResponse = require('../dto/loginResponse')
const ViewResolver = require('../util/viewResolver')
const ResponseMessages = require('../util/responseMessages')
const Logger = require('../config/logger')
const Config = require('../config/config')
const Token = require('../models/client/common/token')
const randtoken = require('rand-token');
const Transaction = require("../models/client/huddle/transaction");
const Notifications = require("../models/client/huddle/notification");
const ChatRoom = require('../models/client/huddle/chatRoom');
let Admin = require("../../server/models/product/client");
let TitleRequest = require("../models/client/order/titleRequestOrder");

module.exports.login = async function (input, subdomain) {
    // Step 1:  Figure out the role of the entered information. if it is:
    //          Superadmin, username TTDAdmin and Role SuperAdmin.
    //          Client admin, username/email provided by user while signing up and his password and Role Admin.
    //          A User, with username/email while signing up and his password and assigned role to the user by admin.

    // Step 2:  output the data based on SuperAdmin login, admin login and client login that includes along with the rights/screens.

    try {
        let user = await User.getModel(subdomain).findOne({
            email: input.email
        });
        if (user) {
            let passwordValid = await bcrypt.compare(input.password, user.password);
            if (passwordValid) {
                let payload = {
                    email: input.email
                };
                let token = jwt.sign(payload, Config.jwt.secret, {
                    expiresIn: 1800 // for 30 minutes in second
                });
                // Get userGroup's permissions.
                let viewPermissions = new Map();
                let promise = user.userGroups.map(id => {
                    return UserGroup.getModel(
                        subdomain
                    ).findOne({ _id: id });
                })
                let groupsPermissions = await Promise.all(promise);
                viewPermissions.set('UserGroups', groupsPermissions)

                //  Role's Permissions.
                let role = await Role.getModel(subdomain).findOne({
                    _id: user.role
                });

                if (!!user.role) {
                    viewPermissions.set("Role", role.views);
                }
                let userNotifications = await Notifications.getModel(subdomain).findOne({ key: user._id }).sort({ _id: -1 });

                let chatRooms = await ChatRoom.getModel(subdomain).find({ 'users.id': user._id })

                let ls = new LoginResponse();
                ls.user._id = user._id;
                ls.user.firstName = user.firstName;
                ls.user.lastName = user.lastName;
                ls.user.imageInfo = user.imageInfo;
                ls.user.head = user.head;
                ls.user.name = user.name;
                ls.user.role = role ? role.name : null
                ls.user.chatRooms = chatRooms;
                ls.token = token;
                ls.defaultView = !!role ? role.defaultView : null;
                ls.subdomain = subdomain;
                ls.views = await ViewResolver.deducePermissions(user.views, viewPermissions);
                ls.notifications = userNotifications ? userNotifications.list : []
                return {
                    code: 200,
                    message: ResponseMessages.LoginSuccess,
                    data: {
                        message: ResponseMessages.LoginSuccess,
                        loginResponse: ls
                    }
                };
            } else {
                return {
                    code: 404,
                    data: { message: ResponseMessages.IncorrectPasswordError }
                };
            }
        } else {
            return { code: 404, data: { message: ResponseMessages.EmailNotFound } };
        }
    } catch (error) {
        console.log(error);

        Logger.log("Error while login", error, "login");
        return {
            code: 500,
            message: ResponseMessages.TryLater
        };
    }
};

module.exports.getUserByEmailAndSubdomain = async function (request) {
    try {
        let userResult = (request.body.subdomain != null) ? await User.getModel(request.body.subdomain).findOne({
            email: request.body.emailId }) : await Admin.getModel().findOne({ email: request.body.emailId, isClient: false });
        if (userResult) {
            return {
                code: 200,
                data: userResult
            }
        }
        else {
            return { code: 404, data: { message: ResponseMessages.EmailNotFound } };
        }
    } catch (error) { }
};

module.exports.generatePasswordToken = function (user, request) {
    return new Promise((resolve, reject) => {
        let TokenModel = Token.getModel();
        var forgot_password_token = user._id + randtoken.generate(50);
        var navigationPath = "forgotPassword/" + forgot_password_token;
        var url = (user.subdomain != null) ? Config.getSubdomainAddress(user.subdomain, navigationPath) : `http://${request.body.url}:8080/${navigationPath}`;
        TokenModel.findOne({ userId: user._id, tokenFor: "forgot-password" }).then(
            user_token => {
                var valid_time = new Date();
                valid_time.setMinutes(valid_time.getMinutes() + 30);
                if (user_token) {
                    TokenModel.update(
                        { userId: user._id, tokenFor: "forgot-password" },
                        {
                            $set: { token: forgot_password_token, expiresAt: valid_time }
                        },
                        function (err, data) {
                            if (err) {
                                Logger.log(
                                    "error while generating password token",
                                    error,
                                    "Error at function forgottoken in user.controller.js"
                                );
                                reject({ code: 500, message: ResponseMessages.TryLater });
                            } else {
                                resolve(url);
                            }
                        }
                    );
                } else {
                    let data = new TokenModel({
                        userId: user._id,
                        token: forgot_password_token,
                        tokenFor: "forgot-password",
                        expiresAt: valid_time
                    });
                    data.save(function (error, result) {
                        if (error) {
                            Logger.log(
                                error,
                                "Error at function generatePasswordToken in user.controller.js"
                            );
                            reject({ status: 500, message: ResponseMessages.TryLater });
                        } else {
                            resolve(url);
                        }
                    });
                }
            }
        );
    });
};


module.exports.verifiedTokenAndEncrpytPassword = async function (request) {
    if (request.body.token) {
        let TokenModel = Token.getModel();
        try {
            let data = await TokenModel.findOne({
                token: request.body.token,
                tokenFor: "forgot-password"
            });
            if (data) {
                let currentDate = new Date();
                currentDate = new Date(currentDate.toLocaleDateString());
                let salt = await bcrypt.genSalt(10);
                let hash = await bcrypt.hash(request.body.newPassword, salt);
                return {
                    password: hash,
                    userId: data.userId,
                    subdomain: request.headers['subdomain'] ? request.headers['subdomain'] : null
                };
            }
        } catch (error) { }
    }
    else {
        try {
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(request.body.newPassword, salt);
            return {
                password: hash,
                userId: request.body.userId,
                subdomain: request.headers['subdomain']
            };
        }

        catch (error) { }
    }
};

// TODO : Need to verify if this is actually needed after merge of huddle.
module.exports.changePassword = async function (user) {
    try {
        emailExist = !!(user.subdomain) ? await User.getModel(user.subdomain).findOne({ _id: user.userId }) : await Admin.getModel().findOne({ _id: user.userId});
        if (emailExist && user.subdomain) {
            userResult = await User.getModel(user.subdomain).update(
                { _id: user.userId },
                { $set: { password: user.password } }
            );           
        }
        else
        {
            userResult = await Admin.getModel().update(
                { _id: user.userId },
                { $set: { password: user.password } }
            );   
        }
        return {
            code: 200,
            data: { message: ResponseMessages.PasswordChangeSuccess }
        };
    } catch (error) { }
};

module.exports.checkCurrentPassword = function (currentPassword, userDetail) {
    return new Promise((resolve, reject) => {
        if (currentPassword != "null") {
            User.getModel()
                .findOne({ _id: userDetail._id })
                .then(user => {
                    //  verifying password with hashed as stored in db.
                    bcrypt.compare(currentPassword, user.password, function (err, res) {
                        if (err) {
                            Logger.log("checkCurrentPassword", err, "checkCurrentPassword");
                            reject({ code: 500, message: ResponseMessages.TryLater });
                        } else {
                            if (res) {
                                resolve({
                                    code: 200,
                                    data: {
                                        matched: true,
                                        message: ResponseMessages.PasswordCorrect
                                    }
                                });
                            } else {
                                reject({
                                    code: 500,
                                    data: {
                                        matched: false,
                                        message: ResponseMessages.IncorrectPasswordError
                                    }
                                });
                            }
                        }
                    });
                })
                .catch(error => {
                    Logger.log("checkCurrentPassword", error, "checkCurrentPassword");
                    reject({ code: 500, message: ResponseMessages.TryLater });
                });
        } else {
            resolve({
                code: 200,
                data: {
                    matched: true,
                    message: ResponseMessages.PasswordCorrect
                }
            });
        }
    });
};

module.exports.verifyRegistrationToken = async function (token, subdomain) {
    try {
        let TokenModel = Token.getModel();
        let UserModel = User.getModel(subdomain);
        let info = await TokenModel.findOne({ token: token });
        if (!info) {
            return { code: 400, message: ResponseMessages.TokenInvalid }
        } else {
            let userRegistered = await UserModel.findOne({ _id: info.userId, status: 'Active' });
            if (!userRegistered) {
                if (new Date(info.expiresAt).getTime() < new Date().getTime()) {
                    return { code: 401, message: ResponseMessages.TokenExpire }
                } else {
                    return { code: 200, data: { userId: info.userId } }
                }
            } else {
                return { code: 409, message: ResponseMessages.UserAlreadyRegistered }
            }
        }
    } catch (error) {
        return { code: 500, message: ResponseMessages.TryLater }
    }
}

module.exports.countMonthTransaction = async function (request) {
    //to get last selectedPeriod months Transaction count of each month 
    let d = new Date();
    d.setMonth(d.getMonth() - request.query.selectedPeriod);
    try {
        let proceedTransaction = await Transaction.getModel(request.headers['subdomain'])
            .aggregate(
                [
                    {
                        $match: {
                            status: 'InProgress',
                            createdOn: {
                                $gte: d,
                                $lte: new Date()
                            }
                        }
                    },
                    {
                        $project: {
                            year: { $year: "$createdOn" },
                            month: { $month: "$createdOn" },
                            dayOfMonth: { $dayOfMonth: "$createdOn" }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                year: '$year',
                                month: '$month',
                            },
                            transactionofmonth: { $sum: 1 }
                        }
                    },
                    { $sort: { _id: 1 } }
                ]);
        let newTransaction = await TitleRequest.getModel(request.headers['subdomain'])
            .aggregate(
                [
                    {
                        $match: {
                            status: 'New',
                            createdOn: {
                                $gte: d,
                                $lte: new Date()
                            }
                        }
                    },
                    {
                        $project: {
                            year: { $year: "$createdOn" },
                            month: { $month: "$createdOn" },
                            dayOfMonth: { $dayOfMonth: "$createdOn" }
                        }
                    },
                    {
                        $group: {
                            _id: {
                                year: '$year',
                                month: '$month',
                            },
                            transactionofmonth: { $sum: 1 }
                        }
                    },
                    { $sort: { _id: 1 } }
                ]);
        let result = [];
        result.push({
            label: "InProgress Transaction",
            backgroundColor: '#249EBF',
            numberOfTransaction: proceedTransaction
        });
        result.push({
            label: "New Transaction",
            backgroundColor: '#9b7ba2',
            numberOfTransaction: newTransaction
        });

        return {
            code: 200,
            data: result
        };
    } catch (error) {
        return {
            code: 500,
            message: "Some error occured, please try later."
        };
    }
};