module.exports.addGetSummaryToOrder = function (order) {
    return order.prototype.getSummary = function () {
        let propertyAddress = !!this.propertyAddress['propertyInformation'] ? this.propertyAddress.propertyInformation : this.propertyAddress
        let requestorArray = [this.requestor.persons[0].firstName, this.requestor.persons[0].phone, this.requestor.persons[0].email];
        let propertyArray = [propertyAddress.address1, propertyAddress.address2, propertyAddress.city, propertyAddress.state, propertyAddress.zip];
        let requestor;
        let property;
        requestorArray.forEach(element => {
            if (!isNullOrUndefined(element)) {
                requestor = requestor ? requestor + ', ' + element : element;
            }
        });
        propertyArray.forEach(element => {
            if (!isNullOrUndefined(element)) {
                property = property ? property + ', ' + element : element;
            }
        });
        return { requestor: requestor, property: property }
    }
}


function isNullOrUndefined(value) {
    return value === undefined || value === null || value === ' '
}
