const Logger = require("../config/logger");
const county = require("../models/client/netsheet/county");
const DivisionDefinition = require("../models/client/netsheet/netsheetDivisionDefinitions");
const message = "An error occurred. Please try again after sometime.";
const EscrowFeeLookup = require("../models/client/netsheet/escrowFeeLookup");
const ClosingCostDefinition = require("../models/client/netsheet/closingCostDefinition");
const LoanAmountVariation = require("../models/client/netsheet/loanAmountVariation");
const TitlePremium = require("../models/client/netsheet/titlePremiumsLookup");
const ConfigurableItem = require("../models/client/netsheet/configurableItems");
const NetsheetContact = require("../models/client/netsheet/netSheetContact");
const fs = require("fs");
const ResponseMessages = require('../util/responseMessages')
// -------------------------- COUNTY ------------------------------//

module.exports.listCounties = async function (request) {
  try {
    let data = await county.getModel(request.headers["subdomain"]).find();
    return {
      code: 200,
      data: data
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getPaginatedCounties = async function (request) {
  try {
    let input = request.query;
    let countyModel = county.getModel(request.headers["subdomain"]);
    let result = await countyModel.paginate(
      {},
      {
        page: Number.parseInt(input.page),
        limit: Number.parseInt(input.limit),
        sort: { _id: -1 }
      }
    );
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

module.exports.addCounty = async function (request) {
  try {
    let countyModel = county.getModel(request.headers["subdomain"]);
    let countyObj = new countyModel(request.body);
    await countyObj.save();
    return { code: 200, message: "County added successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports.updateCounty = async function (request) {
  try {
    await county.getModel(request.headers["subdomain"]).update(
      {
        _id: request.body._id
      },
      {
        $set: request.body
      }
    );
    return { code: 200, message: "Successfully changed county's status" };
  } catch (error) {
    throw error;
  }
};

module.exports.checkCounty = async function (request) {
  try {
    let query = request.query.id
      ? {
        name: { $regex: request.query.name, $options: "i" },
        _id: { $ne: request.query.id }
      }
      : { name: { $regex: request.query.name, $options: "i" } };
    let result = await county
      .getModel(request.headers["subdomain"])
      .findOne(query);
    return {
      code: 200,
      exist: result ? true : false
    };
  } catch (error) {
    throw error;
  }
};

module.exports.updateDivisionDefinition = async function (request) {
  try {
    let DivisionDefinitionModel = DivisionDefinition.getModel(
      request.headers["subdomain"]
    );
    await DivisionDefinitionModel.update(
      {
        _id: request.body._id
      },
      {
        $set: request.body
      }
    );
    return {
      code: 200,
      message: "Division definition updated successfully."
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getDivisionDefinitions = async function (request) {
  try {
    let result = await DivisionDefinition.getModel(request.headers["subdomain"])
      .find()
      .sort({ sortOrder: 1 });
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getDivisionDefinitionById = async function (request) {
  try {
    let result = await DivisionDefinition.getModel(
      request.headers["subdomain"]
    ).findOne({ _id: request.params.id });
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
};

// -------------------------- ESCROW FEE PREMIUM ------------------------------//

module.exports.addEscrowFeePremium = async function (request) {
  try {
    let EscrowFeeLookupModel = EscrowFeeLookup.getModel(
      request.headers["subdomain"]
    );
    let escrowFeeData = new EscrowFeeLookupModel(request.body);
    await escrowFeeData.save();
    return {
      code: 200,
      message: "Escrow fee added successfully."
    };
  } catch (error) {
    throw error;
  }
};

module.exports.updateEscrowFeePremium = async function (request) {
  try {
    let EscrowFeeLookupModel = EscrowFeeLookup.getModel(
      request.headers["subdomain"]
    );
    await EscrowFeeLookupModel.update(
      {
        _id: request.body._id
      },
      {
        $set: request.body
      }
    );
    return {
      code: 200,
      message: "Escrow fee updated successfully."
    };
  } catch (error) {
    throw error;
  }
};

module.exports.deleteEscrowFeePremium = async function (request) {
  try {
    let EscrowFeeLookupModel = EscrowFeeLookup.getModel(
      request.headers["subdomain"]
    );
    await EscrowFeeLookupModel.remove({
      _id: request.params.id
    });
    return {
      code: 200,
      message: "Escrow fee deleted successfully."
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getEscrowFeePremiums = async function (request) {
  try {
    let input = request.query;
    let EscrowFeeLookupModel = EscrowFeeLookup.getModel(
      request.headers["subdomain"]
    );
    let result = await EscrowFeeLookupModel.paginate(
      {},
      {
        page: Number.parseInt(input.page),
        limit: Number.parseInt(input.limit),
        sort: { county: +1, amount: +1 }
      }
    );
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

// -------------------------- CLOSING COST DEFINITION ------------------------------//
module.exports.updateClosingCostDefinition = async function (request) {
  try {
    let ClosingCostDefinitionModel = ClosingCostDefinition.getModel(
      request.headers["subdomain"]
    );
    await ClosingCostDefinitionModel.update(
      {
        _id: request.body._id
      },
      {
        $set: request.body
      }
    );
    return {
      code: 200,
      message: "Closing cost definition updated successfully."
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getClosingCostDefinitions = async function (request) {
  try {
    console.time("time : ");
    let result = await ClosingCostDefinition.getModel(
      request.headers["subdomain"]
    )
      .find({ divisionDefinitionId: request.params.id })
      .sort({ lineNumber: 1 });
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getClosingCostDefinitionById = async function (request) {
  try {
    let result = await ClosingCostDefinition.getModel(
      request.headers["subdomain"]
    ).findOne({ _id: request.params.id });
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

// -------------------------- FINANCING REQUIREMENT ------------------------------//
module.exports.updateFinancingRequirement = async function (request) {
  try {
    let ClosingCostDefinitionModel = ClosingCostDefinition.getModel(
      request.headers["subdomain"]
    );
    await ClosingCostDefinitionModel.update(
      {
        _id: request.params.ccdId,
        "financingRequirements._id": request.body._id
      },
      {
        $set: {
          "financingRequirements.$": request.body
        }
      }
    );
    return {
      code: 200,
      message: "Financial requirement updated successfully."
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getFinancingRequirements = async function (request) {
  try {
    let ClosingCostDefinitionModel = ClosingCostDefinition.getModel(
      request.headers["subdomain"]
    );
    let data = await ClosingCostDefinitionModel.findOne({
      _id: request.params.ccdId
    });
    
    if (data) {
      return { code: 200, data: data.financingRequirements };
    } else {
      return { code: 200, data: [] };
    }
  } catch (error) {
    return { code: 200, message: ResponseMessages.TryLater }
  }
};

// -------------------------- TITLE PREMIUM LOOKUP ------------------------------//
module.exports.addTitlePremium = async function (request) {
  try {
    let TitlePremiumModel = TitlePremium.getModel(request.headers["subdomain"]);
    let titlePremiumData = new TitlePremiumModel(request.body);
    await titlePremiumData.save();
    return {
      code: 200,
      message: "Title fee added successfully."
    };
  } catch (error) {
    throw error;
  }
};

module.exports.updateTitlePremium = async function (request) {
  try {
    let TitlePremiumModel = TitlePremium.getModel(request.headers["subdomain"]);
    await TitlePremiumModel.update(
      {
        _id: request.body._id
      },
      {
        $set: request.body
      }
    );
    return {
      code: 200,
      message: "Title fee updated successfully."
    };
  } catch (error) {
    throw error;
  }
};

module.exports.deleteTitlePremium = async function (request) {
  try {
    let TitlePremiumModel = TitlePremium.getModel(request.headers["subdomain"]);
    await TitlePremiumModel.remove({
      _id: request.params.id
    });
    return {
      code: 200,
      message: "Title fee deleted successfully."
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getTitlePremiums = async function (request) {
  try {
    let input = request.query;
    let TitlePremiumModel = TitlePremium.getModel(request.headers["subdomain"]);
    let result = await TitlePremiumModel.paginate(
      {},
      {
        page: Number.parseInt(input.page),
        limit: Number.parseInt(input.limit),
        sort: { _id: -1, county: +1, amount: +1 }
      })
    return { code: 200, data: result }

  } catch (err) {
    Logger.log(
      "Error while fetching title premiums",
      error,
      "getTitlePremiums"
    );
    return { code: 500, message: ResponseMessages.TryLater }
  }
};


// -------------------------- CONFIGURABLE ITEMS ------------------------------//
module.exports.updateConfigurableItem = async function (request) {
  try {
    let ConfigurableItemModel = ConfigurableItem.getModel(
      request.headers["subdomain"]
    );
    await ConfigurableItemModel.update(
      {
        _id: request.body._id
      },
      {
        $set: request.body
      }
    );

    return {
      code: 200,
      message: "Value updated successfully."
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getConfigurableItems = async function (request) {
  try {
    let input = request.query;
    let ConfigurableItemModel = ConfigurableItem.getModel(
      request.headers["subdomain"]
    );
    let result = await ConfigurableItemModel.paginate(
      {},
      {
        page: Number.parseInt(input.page),
        limit: Number.parseInt(input.limit),
        sort: { _id: -1 }
      }
    );
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

// -------------------------- REPORTS ------------------------------//

module.exports.getActivityReport = async function (request) {
  try {
    let query = new Array();
    let NetsheetContactModel = NetsheetContact.getModel(
      request.headers["subdomain"]
    );
    let reqQuery = request.query;
    console.log(reqQuery);
    let rangeQuery = {
      $match: {
        generatedDate: {
          $gte: new Date(reqQuery.fromDate),
          $lte: new Date(reqQuery.toDate)
        }
      }
    };
    query =
      reqQuery.groupByEmail == "true"
        ? [
          rangeQuery,
          {
            $group: {
              _id: { contactEmail: "$contactEmail" },
              details: { $push: "$$ROOT" }
            }
          }
        ]
        : [rangeQuery];
    console.log(JSON.stringify(query));

    let result = await NetsheetContactModel.aggregate(query);
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getAllNetSheetRequestReport = async function (request) {
  try {
    let NetsheetContactModel = NetsheetContact.getModel(
      request.headers["subdomain"]
    );
    let result = await NetsheetContactModel.aggregate([
      {
        $group: {
          _id: { contactEmail: "$contactEmail" },
          numberOfNetsheets: { $sum: 1 },
          firstUsed: { $min: "$generatedDate" },
          lastUsed: { $max: "$generatedDate" },
          info: { $push: "$$ROOT" }
        }
      }
    ]);
    return {
      code: 200,
      data: result
    };
  } catch (error) {
    throw error;
  }
};

module.exports.setupNetsheetConfigurationData = async function (subdomain) {
  return new Promise((resolve, reject) => {
    let DivisionDefinitionModel = DivisionDefinition.getModel(subdomain);
    fs.readFile(
      "seed/netsheet-calculation-dataset/division-definitions.json",
      "utf8",
      function (error, data) {
        if (error) reject(error);
        let divisionDefinitions = JSON.parse(data);

        divisionDefinitions.forEach((division, index) => {
          let doc = new DivisionDefinitionModel(division);
          doc.save((er, result) => {
            if (er) reject(er);
            setupClosingCostDefinitions(result._id, index, subdomain)
              .then(insertedIndex => {
                if (insertedIndex + 1 === divisionDefinitions.length) {
                  setupConfigurableItems(subdomain)
                    .then(() => {
                      setupLoanAmountVariation(subdomain)
                        .then(() => {
                          resolve({
                            code: 200,
                            message: "Added all required datas"
                          });
                        })
                        .catch(e => {
                          reject(e);
                        });
                    })
                    .catch(e => {
                      reject(e);
                    });
                }
              })
              .catch(err => {
                reject(err);
              });
          });
        });
      }
    );
  });
};

// // Insert all closing cost definitions based on division definition id
// async function setupClosingCostDefinitions(divisionId, index, subdomain) {
//   try {
//     const sections = {
//       0: { start: 0, end: 7 },
//       1: { start: 8, end: 22 },
//       2: { start: 23, end: 27 },
//       3: { start: 28, end: 39 }
//     };
//     let ClosingCostDefinitionModel = ClosingCostDefinition.getModel(subdomain);
//     fs.readFile(
//       "seed/netsheet-calculation-dataset/closing-cost-definition.json",
//       "utf8",
//       function(err, data) {
//         let closingCostDefinitions = JSON.parse(data).filter(
//           (def, i) => i >= sections[index].start && i <= sections[index].end
//         );
//         closingCostDefinitions.forEach((ccd, j) => {
//           ccd["divisionDefinitionId"] = divisionId;
//           let doc = new ClosingCostDefinitionModel(ccd);
//           doc.save();
//         });
//       }
//     );
//   } catch (error) {
//     throw error;
//   }
// }
function setupClosingCostDefinitions(divisionId, index, subdomain) {
  const sections = {
    0: { start: 0, end: 7 },
    1: { start: 8, end: 22 },
    2: { start: 23, end: 27 },
    3: { start: 28, end: 39 }
  };
  return new Promise((resolve, reject) => {
    let ClosingCostDefinitionModel = ClosingCostDefinition.getModel(subdomain);
    fs.readFile(
      "seed/netsheet-calculation-dataset/closing-cost-definition.json",
      "utf8",
      function (err, data) {
        let closingCostDefinitions = JSON.parse(data).filter(
          (def, i) => i >= sections[index].start && i <= sections[index].end
        );
        closingCostDefinitions.forEach((ccd, j) => {
          ccd["divisionDefinitionId"] = divisionId;
          let doc = new ClosingCostDefinitionModel(ccd);
          doc.save((e, r) => {
            if (e) reject(e);
            if (j + 1 === closingCostDefinitions.length) {
              resolve(index);
            }
          });
        });
      }
    );
  });
}

// Insert all configurable items
function setupConfigurableItems(subdomain) {
  return new Promise((resolve, reject) => {
    let ConfigurableItemModel = ConfigurableItem.getModel(subdomain);
    fs.readFile(
      "seed/netsheet-calculation-dataset/configurable-items.json",
      "utf8",
      function (err, data) {
        if (err) reject(err);
        let items = JSON.parse(data);
        items.forEach((item, i) => {
          let doc = new ConfigurableItemModel(item);
          doc.save((error, result) => {
            if (error) reject(error);
            if (i + 1 === items.length) {
              resolve();
            }
          });
        });
      }
    );
  });
}

function setupLoanAmountVariation(subdomain) {
  return new Promise((resolve, reject) => {
    let LoanAmountVariationModel = LoanAmountVariation.getModel(subdomain);
    fs.readFile(
      "seed/netsheet-calculation-dataset/loan-amount-variation.json",
      "utf8",
      function (err, data) {
        if (err) reject(err);
        let items = JSON.parse(data);
        items.forEach((item, i) => {
          let doc = new LoanAmountVariationModel(item);
          doc.save((error, result) => {
            if (error) reject(error);
            if (i + 1 === items.length) {
              resolve();
            }
          });
        });
      }
    );
  });
}
