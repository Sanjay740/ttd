const netsheetManager = require('../managers/netsheet.manager')

module.exports.generateNetSheet = function (request, response) {
    netsheetManager.genNetSheet(request)
        .then((result) => {
            response.status(200).json({ success: true, data: result, message: 'Net Sheet Calculation' });
        })
        .catch((error) => {
            response.status(error.code).json(error.message);
        })
}

module.exports.mailNetsheetCostEstimate = function (request, response) {
    netsheetManager.mailNetsheetCostEstimate(request)
        .then((result) => {
            response.status(result.code).json(result);
        })
        .catch((error) => {
            console.log(error);
            
            response.status(error.code).json(error.message);
        })
}