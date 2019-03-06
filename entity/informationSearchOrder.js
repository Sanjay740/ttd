let valueCheck = require("./abstractOrder");

exports.OrderTemplate = function (order,companyName) {
    var template = `
    <div style="background-color: #fcfaff; width: 100%; height: 60px; border-bottom: 2px solid rgb(204, 204, 204);">
        <h1 style="font-family: arial; font-weight: 200; font-size: 14px; color: #363d71; padding-top: 25px; padding-left: 20px;">Information Search Order</h1>
    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">General Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Information Search Type:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.searchType)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">If Other, Please Specify:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.searchText)}</h1>
            </div>
        </div>

    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Company Placing Order</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Firm Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.contactInformation.companyName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.contactInformation.name)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Phone:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.contactInformation.phone)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Fax:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.contactInformation.fax)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Reference Number:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.contactInformation.referenceNumber)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.contactInformation.address.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.contactInformation.address.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.contactInformation.address.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.contactInformation.address.zip)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.contactInformation.address.state)}</h1>
            </div>
        </div>

    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Property Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.zip)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.state)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">County:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.county)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Lot:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.lot)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Block:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.block)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Qualifier:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.qualifier)}</h1>
            </div>
        </div>

    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Owner/Leaseholder Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Company Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.ownersInformation[0].name)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">First Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.ownersInformation[0].persons[0].firstName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Middle Initial:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.ownersInformation[0].persons[0].middleName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Last Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.ownersInformation[0].persons[0].lastName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">SSN:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.ownersInformation[0].persons[0].ssn)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Date Of Birth:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.checkDate(order.ownersInformation[0].persons[0].dob)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Company Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.ownersInformation[1].name)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">First Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.ownersInformation[1].persons[0].firstName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Middle Initial:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.ownersInformation[1].persons[0].middleName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Last Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.ownersInformation[1].persons[0].lastName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">SSN:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.ownersInformation[1].persons[0].ssn)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Date Of Birth:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.checkDate(order.ownersInformation[1].persons[0].dob)}</h1>
            </div>
        </div>
        
    </div>
    
    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Mortgage Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Lender:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.lender.name)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Mortgage Amount:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">$ ${valueCheck.isNullOrUndefined(order.lender.mortgageAmount)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Mortgage Book:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.lender.mortgageBook)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Mortgage Page:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.lender.mortgagePage)}</h1>
            </div>
        </div>
    </div>      

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Additional Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.additionalComments)}</h1>
            </div>
        </div>
    </div>

    <div style="background-color: white; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Requestor Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestor.name)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Phone:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestor.phone)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Fax:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestor.fax)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Email:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestor.email)}</h1>
            </div>
        </div>
    </div>
    `

    return template;
}
