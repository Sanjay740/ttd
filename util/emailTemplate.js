let config = require("../config/config");

exports.emailTemplate = function (type, data) {
  var template = `<div>
  <div style="font-size: 12pt;width: 700px;margin: 0 auto;float: none;background: #fff;">
    <table cellSpacing="0" cellPadding="0" align="middle" border="0" style="height:100px;width: 100%;background-color: #5e239f; background-image:url('cid:uniquebackground@kreata.ee');">
      <tbody>
        <tr>
          <td>
            <table style="width: 100%;" cellSpacing="0" cellPadding="0" align="middle" border="0">
              <tbody>
                <tr>
                  <td>
                    <div style="width:90%;color: #fff;text-align: center;font-family: Helvetica,Arial,sans-serif;font-size: 42px;font-weight: 300;padding: 45px 10px;margin:0 auto;">
                    </div>	
                    <div style="width:94.4%; background-color: #fff; min-height: 50px; margin: 0 auto;">
                      <div style="background-color: #fff; padding: 12px 20px; font-size: 20px;border-bottom: 1px solid #ddd;display: flex;align-content: center; align-items: center;">
                        <img height="32px" src='cid:uniqueLogo@kreata.ee' />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>

      <tbody>
        <tr>
          <td>
            <table style="width: 100%;" cellSpacing="0" cellPadding="0" align="middle" border="0">
              <tbody>
                <tr>
                  <td>
                    <div style="width:90%;color: #fff;text-align: center;font-family: Helvetica,Arial,sans-serif;font-size: 42px;font-weight: 300;padding: 0px 10px;margin:0 auto;">
                    </div>	
                    <div style="width:94.4%; background-color: #fff; min-height: 50px; margin: 0 auto;">
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>

      <table width="100%" cellSpacing="0" cellPadding="0" border="0" style="">
        <tbody>
          <tr>
            <td style="min-width: 2.9%;width: 2.9%;background: #e2e3ea">
              <div style="min-height: 30px">
              </div>
            </td>
            <td style="background:#fff">
              <table cellSpacing="0" cellPadding="0" border="0" style="font-family: Helvetica,Arial,sans-serif;min-height: 50x; font-weight: 100; color: rgb(93, 97, 104);width: 100%;margin:-3px auto 0;padding: 0px 0px;border-bottom: 15px solid #e2e3ea; border-top: 1px solid #fff;background: #fff;table-layout: fixed;width: 100%" cellSpacing="0" cellPadding="0" border="0">
                <tbody>
                  <tr style="width: 100%">
                    <td style="padding: 0px 10%">
                      <table style="width: 100%; table-layout: fixed;" cellSpacing="0" cellPadding="0" border="0">
                        <tbody>
                          <tr>
                            <td style="padding: 0 5px;font-weight: normal;">
                              <p style="color: #363d71;font-size: 18px;"><strong> Dear User</strong></p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 0 5px;font-weight: normal;">
                              <p style="margin: 10px 0 0 0;color: #3f4651;font-weight: normal;font-size: 16px;font-family: Helvetica,Arial,sans-serif;text-transform: capitalize">
                              ${getEmailBody(type, data)}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="background-color: #fff;padding:0px 10% 20px 10%;font-weight: normal;">
                      <table style="width: 100%" cellSpacing="0" cellPadding="0" border="0">
                        <tbody>
                        <tr>
                          <td style="padding:15px 0px;border-top: 1px solid #ddd;">
                            <span style="float: left;">
                              <span style="font-family: sans-serif; font-size: 12px; color: #54657a;"> &copy;  TitleTransactionDealer Team | All Rights Reserved. </span>
                            </span>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td style="min-width: 2.9%;width: 2.9%;background: #e2e3ea">
              <div style="min-height: 30px">
              </div>
            </td>
          </tr>
      </tbody>
    </table>
  </div>
</div>`

  return template;
}

function getEmailBody(value, data) {
  let body = '';
  let signatureText = `
  <tr><td style="padding: 15px  0px 0px 10px;font-size:16px;color:#535d6c;"> Thank you </td></tr>
  <tr><td style="padding: 15px  0px 40px 10px;font-size:16px;color:#535d6c;"> TitleTransactionDealer</td></tr>
  `;
  switch (value) {
    case 'orderSummary':
      body = `<tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;">${data.client.fullName}</td></tr>
              <tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;"> An order of type ${data.orderSummary.type}has been requested. Order Summary is:  <br><br>Property Address: ${data.orderSummary.property}.<br><br>Requested by 
              ${data.orderSummary.requestor}.<br> Please access your TitleTransactionDealer portal to see the complete details of order. 
              <a href=${config.getSubdomainAddress(data.client.subdomain, 'portal')} target="_blank">Click here</a> </td></tr>
              ${signatureText}`
      break;
    case 'submitQuery':
      body = `<tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;">${data.name} <br>${data.email}<br></td></tr>
              <tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;">${data.message}</td></tr>
              ${signatureText}`
      break;
    case 'orderPdf':
      body = `<tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;"><p>Your request for ${data.orderName} has been successfully processed.</p></td></tr>
              ${signatureText}`;
      break;
    case 'forgotPassword':
      body = `<tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;"> You have requested to reset your password, Please follow the link below to reset your password.</td></tr>
              <tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;"> Please ignore this email if you did not request a password change.</td></tr>
              <tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;"><a href="${data.url}" target="_blank"> Follow this link to reset your password.</a></td></tr>
              ${signatureText}`
      break;
    case 'mailVerification':
      body = `<tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;">${data.name}</td></tr>
              <tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;"> Your verification code is ${data}.</td></tr>
              ${signatureText}`
      break;
    case 'netsheetEstimate':
      body = `
              <tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;">
              Please find attached to this email the PDF of Estimated Closing Costs.
              </td></tr>
              ${signatureText}`;
      break;
    case 'userRegistration':
      body =  `<tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;">Please follow the link below for your registration.</td></tr>
              <tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;"><a href="${data.url}" target="_blank">Click Here</a></td></tr>
              ${signatureText}`
      break;
      case 'CalendarEvent':
      body =  `<tr><td style="padding: 15px 10px;font-size:16px;color:#535d6c;">Calendar Event is Schedule .Please see the  event</td></tr>
              ${signatureText}`
      break;
  }
  return body;
}
