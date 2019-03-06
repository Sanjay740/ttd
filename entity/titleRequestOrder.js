
let valueCheck = require("./abstractOrder");

exports.OrderTemplate = function (order,companyName) {
    var template = ` <div>
    <div style="background-color: #fcfaff; width: 100%; height: 60px; border-bottom: 2px solid rgb(204, 204, 204);">
        <h1 style="font-family: arial; font-weight: 200; font-size: 14px; color: #363d71; padding-top: 25px; padding-left: 20px;">Order Request</h1>
    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
  
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Order Information</h1>
        </div>
        <div style="width: 50%;">
            <div style="width: 100%; float: left;">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Transaction Type:</h1>
                 <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.titleInformation.transactionType)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Closing Date:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.checkDate(order.titleInformation.closingDate)}</h1>
            </div>
        </div>

        <div style="width: 100%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Special Instructions:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 90px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.titleInformation.specialInstructions)}</h1>
            </div>
        </div>
    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Requestor Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestor.name)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left;">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Email:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestor.email)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Phone:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestor.phone)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left;">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Fax:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.requestor.fax)}</h1>
            </div>
        </div>

    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Property Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.zip)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.propertyAddress.state)}</h1>
            </div>
        </div>
    </div>

    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Seller Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.sellerInformation.name)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Email:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.sellerInformation.email)} </h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Phone:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.sellerInformation.phone)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">SSN:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.sellerInformation.ssn)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.sellerInformation.address.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.sellerInformation.address.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.sellerInformation.address.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.sellerInformation.address.zip)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.sellerInformation.address.state)}</h1>
            </div>
        </div>
    </div>


    <div style="background-color: white; border-bottom: 2px solid #575c77; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Buyer Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.buyerInformation.name)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Email:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.buyerInformation.email)} </h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Phone:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.buyerInformation.phone)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">SSN:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.buyerInformation.ssn)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Address Line 1:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.buyerInformation.address.address1)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Address Line 2:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.buyerInformation.address.address2)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">City:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.buyerInformation.address.city)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Zip:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;"> ${valueCheck.isNullOrUndefined(order.buyerInformation.address.zip)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">State:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 70px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.buyerInformation.address.state)}</h1>
            </div>
        </div>

    </div>


    <div style="background-color: white; padding-bottom: 10px; float: left; width: 90%; min-height: 2px; padding-left: 5%;">
        <div>
            <h1 style="font-family: arial; font-weight: 200; margin-bottom: 0.1rem; font-size: 12px; color: #363d71;  margin-bottom: 0.1rem;">Refinance Information</h1>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Mortgage Broker Name:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.refinanceInformation.name)}</h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Mortgage Broker Email:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.refinanceInformation.email)} </h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Mortgage Broker Phone:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.refinanceInformation.phone)} </h1>
            </div>
        </div>

        <div style="width: 50%; float: left;">
            <div style="width: 100%; float: left; ">
                <h1 style="font-family: roboto; margin-bottom: 0.1rem; font-weight: bold; font-size: 8px; color: #2d3665; float: left;">Mortgage Broker Fax:</h1>
                <h1 style="font-family: arial; font-size: 8px; color: #2d3665; padding-left: 100px; font-weight: 200; margin-bottom: 0.1rem;">${valueCheck.isNullOrUndefined(order.refinanceInformation.fax)} </h1>
            </div>
        </div>

    </div>

</div`

    return template;
}
