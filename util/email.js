const MailConfig = require('../../server/config/mailer');
const Client = require('../models/product/client');
const template = require("./emailTemplate");
const Logger = require('../config/logger')

module.exports.userInvitationMail = async function (user_email, user_name, url) {
    let body = {
      name: user_name,
      url: url
    }
    const userInvitationTemplate = template.emailTemplate("userRegistration", body)
    MailConfig.transporter.sendMail({
      from: MailConfig.sender,
      to: user_email,
      subject: 'Invitation to participate in Transaction or Closing',
      html: userInvitationTemplate,
      attachments: [{
        filename: 'logo',
        path: 'images/ttd_logo.png',
        cid: 'uniqueLogo@kreata.ee'
      }]
    });

    return {
      code: 200, data: { message: 'A link is sent to your email. Please follow the link to register.' }
    }
}

module.exports.mailCalendarEventUsers= async function(user,transactionId,taskId,taskName){
  console.log('in email js..');
  
  const userInvitationTemplate = template.emailTemplate("CalendarEvent", user);
  MailConfig.transporter.sendMail({
    from: MailConfig.sender,
    to: user.email,
    subject: 'calendar event ',
    html: userInvitationTemplate,
    attachments: [{
      filename: `${taskName}.ics`,
      path: `temp/${taskName}.ics`,
      cid: 'uniqueLogo@kreata.ee'
    }]
  });

}

module.exports.sendOrderMail = async function (orderSummary) {
  try {
    let client = await Client.getModel().findOne({ _id: orderSummary.clientId });
    const orderRequestTemplate = template.emailTemplate("orderSummary", { orderSummary: orderSummary, client: client });
    let mailPayload = {
      from: MailConfig.sender,
      to: client.email,
      subject: orderSummary.type + ' order request',
      html: orderRequestTemplate,
      attachments: [{
        filename: 'backgroundImage',
        path: 'images/background_image.jpeg',
        cid: 'uniquebackground@kreata.ee' //same cid value as in the html img src
      }, {
        filename: 'logo',
        path: client.logo.fileName != null ? "https://f002.backblazeb2.com/file/agami-bucket/Logos/" + client.logo.fileName : "images/ttd_logo.png",
        cid: 'uniqueLogo@kreata.ee'
      }]
    };
    
    MailConfig.transporter.sendMail(mailPayload)
 
    return;
  } catch (error) {
    return error;
  }
}

module.exports.submitQueryMail = function (query) {
    const queryTemplate = template.emailTemplate("submitQuery", query);
    MailConfig.transporter.sendMail({
      from: MailConfig.sender,
      to: MailConfig.queryEmail,
      subject: 'Query',
      html: queryTemplate,
      attachments: [{
        filename: 'backgroundImage',
        path: 'images/background_image.jpeg',
        cid: 'uniquebackground@kreata.ee' //same cid value as in the html img src
      },
      {
        filename: 'logo',
        path: 'images/ttd_logo.png',
        cid: 'uniqueLogo@kreata.ee' //same cid value as in the html img src
      }]
    }, function (err, info) {
      if (err) {
        Logger.log('Error occurred while sending query mail.', err, 'submitQueryMail') 
      } 
  })
}

module.exports.sendforgotPasswordMail = function (user_email, user_name, url) {
  let body = {
    name: user_name, url: url
  };
    const forgotPasswordTemplate = template.emailTemplate("forgotPassword", body);
    MailConfig.transporter.sendMail({
      from: MailConfig.sender,
      to: user_email,
      subject: 'Forgot Password',
      html: forgotPasswordTemplate,
      attachments: [{
        filename: 'backgroundImage',
        path: 'images/background_image.jpeg',
        cid: 'uniquebackground@kreata.ee' //same cid value as in the html img src
      },
      {
        filename: 'logo',
        path: 'images/ttd_logo.png',
        cid: 'uniqueLogo@kreata.ee' //same cid value as in the html img src
      }]
    }, function (err, info) { 
      if (err) {
        Logger.log('Error occurred while sending  forgot password mail for user email' + user_email, err, 'sendforgotPasswordMail');
      }
    });
}


module.exports.sendOrderPdfMail = function (user_email, logo, orderPdf, orderType) {
    let orderName = require("../util/orderType").getOrderName(orderType);
    const orderPdfTemplate = template.emailTemplate("orderPdf", {orderName:orderName});

    MailConfig.transporter.sendMail({
      from: MailConfig.sender,
      to: user_email,
      subject: 'Request for order PDF',
      html: orderPdfTemplate,
      attachments: [orderPdf, {
        filename: 'backgroundImage',
        path: 'images/background_image.jpeg',
        cid: 'uniquebackground@kreata.ee' //same cid value as in the html img src
      }, {
          filename: 'logo',
          path: logo != null ? logo : "images/ttd_logo.png",
          cid: 'uniqueLogo@kreata.ee'
        }]
    }, function(error, result){
         if(error) {

          Logger.log('Error occurred while sending Order Pdf mail.', err, 'sendOrderPdfMail');
         }
    });
}
