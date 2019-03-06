let valueCheck = require("./abstractOrder");

exports.OrderTemplate = function (order,companyName) {
    var template = ` <div>
    <div style="background-color: #fcfaff; width: 100%; height: 60px; border-bottom: 2px solid rgb(204, 204, 204);">
        <h1 style="font-family: arial; font-weight: 200; font-size: 14px; color: #363d71; padding-top: 25px; padding-left: 20px;">Limited Loan Coverage Policy</h1>
    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Requestor</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Company Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestor.name)}</h1>
            </div>
        </div>


        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestor.address.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestor.address.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestor.address.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestor.address.zip)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestor.address.state)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Phone:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestor.phone)}</h1>
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

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Role:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestor.contactType)}</h1>
            </div>
        </div>

    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Requested For</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Company Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestedFor.name)}</h1>
            </div>
        </div>


        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestedFor.address.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestedFor.address.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestedFor.address.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestedFor.address.zip)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestedFor.address.state)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Phone:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.requestedFor.phone)}</h1>
            </div>
        </div>


        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Fax:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestedFor.fax)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Email:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestedFor.email)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Role:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestedFor.contactType)}</h1>
            </div>
        </div>

        <div style="width: 100%; float: left; margin-top: 10px;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Persons</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">First Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestedFor.persons[0].firstName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Middle Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestedFor.persons[0].middleName)}</h1>
            </div>
        </div>

        <div style="width: 100%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Last Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestedFor.persons[0].lastName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">First Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestedFor.persons[1].firstName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Middle Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestedFor.persons[1].middleName)}</h1>
            </div>
        </div>

        <div style="width: 100%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Last Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestedFor.persons[1].lastName)}</h1>
            </div>
        </div>

    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">General Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Date Needed:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.checkDate(order.dateNeeded)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Reference / Loan Number :</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.loanNumber)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Mortgage Policy (Amount of Loan):</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 130px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.mortgageAmount)}</h1>
            </div>
        </div>
        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Is Your Mortgage Ready To Be Picked Up?:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 160px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isTrueOrFalse(order.mortgageReadyForPickUp.readyForPickUp)}</h1>
            </div>
        </div>

    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Property Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Property Type:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.propertyAddress.propertyInformation.propertyType)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.propertyAddress.propertyInformation.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.propertyAddress.propertyInformation.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.propertyAddress.propertyInformation.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.propertyAddress.propertyInformation.zip)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.propertyAddress.propertyInformation.state)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">County:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.propertyAddress.propertyInformation.county)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Parcel Number:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.parcelNumber)}</h1>
            </div>
        </div>

        <div style="width: 100%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Legal Description:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.propertyAddress.legalDescription)}</h1>
            </div>
        </div>
    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Owner / Borrower</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Borrower 1 First Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.ownerInformation.contact.persons[0].firstName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Borrower 1 Last Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.ownerInformation.contact.persons[0].lastName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Borrower 2 First Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.ownerInformation.contact.persons[1].firstName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Borrower 2 Last Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.ownerInformation.contact.persons[1].lastName)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.ownerInformation.contact.address.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.ownerInformation.contact.address.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.ownerInformation.contact.address.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.ownerInformation.contact.address.state)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; font-weight: bold; font-size: 8px; color: #2d3665; float: left; margin-bottom: 0.1rem;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.ownerInformation.contact.address.zip)}</h1>
            </div>
        </div>
    </div>

    <div style="background-color: white; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Additional Information</h1>
        </div>

        <div style="width: 100%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: arial; font-weight: 200; font-size: 8px; color: #022751; float: left;">${valueCheck.isNullOrUndefined(order.additionalComments)}</h1>
            </div>
        </div>

    </div>

</div>`

    return template;
}
