var fs = require('fs')
let mailConfig = require("../util/email");
var conversion = require("phantom-html-to-pdf")({
    phantomPath: require("phantomjs-prebuilt").path
});

exports.orderPdf = function (order, userEmail, template, companyName, logo) {
    let templateName = require("../entity/" + template);
    let htmlTemplate = templateName.OrderTemplate(order, companyName);
        conversion({
            paperSize: {
                format: "A4"
            }, html: htmlTemplate
        }, function (err, pdf) {
            var output = fs.createWriteStream(`temp/${template}-${order.orderNumber}.pdf`)
            if (pdf) {
                pdf.stream.pipe(output);
                var email_attachments = {
                    filename: `${template}-${order.orderNumber}`,
                    path: `temp/${template}-${order.orderNumber}.pdf`,
                    contentType: 'application/pdf'
                };
                
                mailConfig
                    .sendOrderPdfMail(userEmail, logo, email_attachments, template);
            }           
        });
}