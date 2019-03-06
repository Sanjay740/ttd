
var moment = require('moment');
exports.OrderTemplate = function (order,companyName) {
    var template = ` <div>
    <div style="background-color: #fcfaff; width: 100%; height: 60px; border-bottom: 2px solid rgb(204, 204, 204);">
        <h1 style="font-family: arial; font-weight: 200; font-size: 14px; color: #363d71; padding-top: 25px; padding-left: 20px;">Abstract Report</h1>
    </div>
 
    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Requestor</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Company Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestor.name)}</h1>
            </div>
        </div>


        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestor.address.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestor.address.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestor.address.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestor.address.zip)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestor.address.state)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Phone:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestor.phone)}</h1>
            </div>
        </div>


        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Fax:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestor.fax)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Email:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestor.email)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Role:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestor.contactType)}</h1>
            </div>
        </div>

    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;">Requested For</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Company Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.name)}</h1>
            </div>
        </div>


        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.address.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.address.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.address.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.address.zip)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.address.state)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Phone:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.phone)}</h1>
            </div>
        </div>


        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Fax:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.fax)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Email:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.email)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Role:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.contactType)}</h1>
            </div>
        </div>

        <div style="width: 100%; float: left; margin-top: 10px;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: arial; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Persons</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">First Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.persons[0].firstName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Middle Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.persons[0].middleName)}</h1>
            </div>
        </div>

        <div style="width: 100%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Last Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.persons[0].lastName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">First Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.persons[1].firstName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Middle Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.persons[1].middleName)}</h1>
            </div>
        </div>

        <div style="width: 100%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Last Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.requestedFor.persons[1].lastName)}</h1>
            </div>
        </div>

    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;">Services Requested</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Report Type:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.servicesRequested.reportType)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Report Delivery:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.servicesRequested.reportDelivery)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Date Needed:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.checkDate(order.servicesRequested.dateNeeded)}</h1>
            </div>
        </div>


        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Reference / Loan Number:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.servicesRequested.loanNumber)}</h1>
            </div>
        </div>
    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;">Property Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.propertyAddress.propertyInformation.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.propertyAddress.propertyInformation.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.propertyAddress.propertyInformation.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.propertyAddress.propertyInformation.zip)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.propertyAddress.propertyInformation.state)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">County:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.propertyAddress.propertyInformation.county)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Parcel Number:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.propertyAddress.parcelNumbe)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; ">Legal Description:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.propertyAddress.legalDescription)}</h1>
            </div>
        </div>
    </div>

    <div style="background-color: white; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;">Additional Information</h1>
        </div>

        <div style="width: 100%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; font-weight: 200; margin-bottom: 0.1rem;">${module.exports.isNullOrUndefined(order.additionalComments)} </h1>
            </div>
        </div>
</div>`

    return template;
}


module.exports.isNullOrUndefined = function (value) {
    if (value === undefined || value === null) {
        return ' ';
    } else {
        return value;
    }
}

exports.isTrueOrFalse = function (value) {
    if (value === true) {
        return 'Yes';
    } else {
        return 'No';
    }
}

module.exports.checkDate = function (value) {
    if (value === undefined || value === null) {
        return ' ';
    } else {
        return moment(value).format("MMM DD YYYY")
    }
}