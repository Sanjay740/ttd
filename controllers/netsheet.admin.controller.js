const netsheetAdminManager = require('../managers/netsheet.admin.manager')

module.exports.updateCounty = function (request, response) {
  netsheetAdminManager.updateCounty(request)
    .then((result) => {
      response.status(result.code).json(result.data);
    })
    .catch((error) => {
      response.status(error.code).json(error.message);
    })
}

module.exports.listCounties = function (request, response) {
  netsheetAdminManager.listCounties(request)
    .then((result) => {
      response.status(result.code).json(result.data);
    })
    .catch((error) => {
      response.status(error.code).json(error.message);
    })
}

module.exports.getPaginatedCounties = function (request, response) {
  netsheetAdminManager.getPaginatedCounties(request)
    .then((result) => {
      response.status(result.code).json(result.data);
    })
    .catch((error) => {
      response.status(error.code).json(error.message);
    })
}

module.exports.addCounty = function (request, response) {
  netsheetAdminManager.addCounty(request)
    .then((result) => {
      response.status(result.code).json(result.data);
    })
    .catch((error) => {
      response.status(error.code).json(error.message);
    })
}

module.exports.checkCounty = function (request, response) {
  netsheetAdminManager.checkCounty(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}


module.exports.updateDivisionDefinition = function (request, response) {
  netsheetAdminManager.updateDivisionDefinition(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}
module.exports.getDivisionDefinitions = function (request, response) {
  netsheetAdminManager.getDivisionDefinitions(request)
    .then((result) => {
      response.status(result.code).json(result.data)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.getDivisionDefinitionById = function (request, response) {
  netsheetAdminManager.getDivisionDefinitionById(request)
    .then((result) => {
      response.status(result.code).json(result.data)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

// ------------------------ ESCROW FEE PREMIUM -----------------------//

module.exports.addEscrowFeePremium = function (request, response) {
  netsheetAdminManager.addEscrowFeePremium(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.updateEscrowFeePremium = function (request, response) {
  netsheetAdminManager.updateEscrowFeePremium(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.deleteEscrowFeePremium = function (request, response) {
  netsheetAdminManager.deleteEscrowFeePremium(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.getEscrowFeePremium = function (request, response) {
  netsheetAdminManager.getEscrowFeePremiums(request)
    .then((result) => {
      response.status(result.code).json(result.data)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}


// ------------------------ CLOSING COST DEFINITION -----------------------//

module.exports.updateClosingCostDefinition = function (request, response) {
  netsheetAdminManager.updateClosingCostDefinition(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}


module.exports.getClosingCostDefinition = function (request, response) {
  netsheetAdminManager.getClosingCostDefinitions(request)
    .then((result) => {
      response.status(result.code).json(result.data)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.getClosingCostDefinitionById = function (request, response) {
  netsheetAdminManager.getClosingCostDefinitionById(request)
    .then((result) => {
      response.status(result.code).json(result.data)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.updateFinancingRequirement = function (request, response) {
  netsheetAdminManager.updateFinancingRequirement(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.getFinancingRequirements = function (request, response) {
  netsheetAdminManager.getFinancingRequirements(request)
    .then((result) => {
      response.status(result.code).json(result.data)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

// ------------------------ LOAN AMOUNT VARIATION -----------------------//

module.exports.addLoanAmountVariation = function (request, response) {
  netsheetAdminManager.addLoanAmountVariation(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.updateLoanAmountVariation = function (request, response) {
  netsheetAdminManager.updateLoanAmountVariation(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.deleteLoanAmountVariation = function (request, response) {
  netsheetAdminManager.deleteLoanAmountVariation(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.getLoanAmountVariations = function (request, response) {
  netsheetAdminManager.getLoanAmountVariations(request)
    .then((result) => {
      response.status(result.code).json(result.data)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

// ------------------------ TITLE PREMIUM -----------------------//

module.exports.addTitlePremium = function (request, response) {
  netsheetAdminManager.addTitlePremium(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.updateTitlePremium = function (request, response) {
  netsheetAdminManager.updateTitlePremium(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.deleteTitlePremium = function (request, response) {
  netsheetAdminManager.deleteTitlePremium(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}
module.exports.getTitlePremiums = function (request, response) {
  netsheetAdminManager.getTitlePremiums(request)
    .then((result) => {
      response.status(result.code).json(result.data)
    })
    .catch((error) => {
      console.log(error);
      
      response.status(error.code).json(error.message)
    })
}


// ------------------------ Configurable Items -----------------------//

module.exports.updateConfigurableItem = function (request, response) {
  netsheetAdminManager.updateConfigurableItem(request)
    .then((result) => {
      response.status(result.code).json(result)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

module.exports.getConfigurableItems = function (request, response) {
  netsheetAdminManager.getConfigurableItems(request)
    .then((result) => {
      response.status(result.code).json(result.data)
    })
    .catch((error) => {
      response.status(error.code).json(error.message)
    })
}

// ------------------------ Reports -----------------------//

module.exports.getActivityReport = function (request, response) {
  netsheetAdminManager.getActivityReport(request)
    .then((result) => {
      response.status(result.code).json(result.data)
    })
    .catch((error) => {
      console.log(error);

      response.status(error.code).json(error.message)
    })
}

module.exports.getCustomerReport = function (request, response) {
  netsheetAdminManager.getAllNetSheetRequestReport(request)
    .then((result) => {
      response.status(result.code).json(result.data)
    })
    .catch((error) => {
      console.log(error);

      response.status(error.code).json(error.message)
    })
}