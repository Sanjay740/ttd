// ############################ MAIL API CONFIGURATION ############################
var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");
exports.transporter = nodemailer.createTransport({
    host: 'md-19.webhostbox.net',
    port: 587,
    secure: false,
    // port: 587,   
    auth: {
        user: 'test@titletransactiondealer.com',
        pass: 'test@@124'
    }
});    

exports.queryEmail = 'noreply@titletransactiondealer.com'
exports.sender = 'test@titletransactiondealer.com'











