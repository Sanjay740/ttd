const NetSheetContact = require("../models/client/netsheet/netSheetContact");
const NetsheetDivisionDefinitions = require("../models/client/netsheet/netsheetDivisionDefinitions");
const EscrowFeeLookup = require("../models/client/netsheet/escrowFeeLookup");
const EnumTypes = require("../models/client/netsheet/enumTypes");
const TitlePremiumsLookup = require("../models/client/netsheet/titlePremiumsLookup");
const Logger = require("../config/logger");
const ClientUser = require("../models/client/userManagement/user")
const ConfigurableItems = require("../util/configurableItems");
const NetSheetEstimateTemplate = require("../util/netsheetEstimateTemplate");
const fs = require("fs");
const pdfConversion = require("phantom-html-to-pdf")({
  phantomPath: require("phantomjs-prebuilt").path
});
const mail_config = require("../../server/config/mailer");
const template = require("../util/emailTemplate");
const notification = require("../notifications/redisNotificationChannels")
const orderManager = require("./order.manager");

function calculateDownPayment(downPaymentType, purchasePrice, downPaymentPercent) {
  let downPaymentAmount;
  if (downPaymentType == "Flat") {
    downPaymentAmount = parseFloat(downPaymentAmount);
  } else {
    downPaymentAmount =
      parseFloat(purchasePrice) *
      (parseFloat(downPaymentPercent) * parseFloat(0.01));
  }
  return downPaymentAmount;
}

function calculateTotalRealtorCommission(
  brokerageCommision,
  realTorCommisionPercent,
  purchasePrice
) {
  return (
    parseFloat(brokerageCommision) +
    (parseFloat(realTorCommisionPercent) / 100) * parseFloat(purchasePrice)
  );
}

function calculateMonthlyPropertyTaxes(annualPropertyTaxes) {
  let monthlyPropertyTaxes = 0;
  monthlyPropertyTaxes = annualPropertyTaxes / 12;
  return monthlyPropertyTaxes.toFixed(2);
}

async function calculateMonthlyHazardInsurance(purchasePrice, subdomain) {
  let configItems = await ConfigurableItems(subdomain);
  let monthlyHazardInsurance =
    (purchasePrice * configItems.HarzardInsuranceMultiplier) / 12;
  console.log('MHI', monthlyHazardInsurance.toFixed(2));

  return monthlyHazardInsurance.toFixed(2);
}

async function calculateMonthlyPMI(
  purchasePrice,
  loanAmount,
  loanType,
  subdomain
) {
  let configItems = await ConfigurableItems(subdomain);
  let loanPercent = 0,
    monthlyMortgageInsurance = 0;
  loanPercent = loanAmount / purchasePrice;
  if (loanType == EnumTypes.loanType.USDA) {
    monthlyMortgageInsurance = (loanAmount * configItems.USDAVal) / 12;
  } else if (loanType == EnumTypes.loanType.FHA) {
    monthlyMortgageInsurance = (loanAmount * configItems.FHAVal) / 12;
  } else if (
    loanType == EnumTypes.loanType.VA ||
    loanType == EnumTypes.loanType.ownerCarryBack
  ) {
    monthlyMortgageInsurance = 0;
  } else if (loanPercent >= configItems.MPILevel1) {
    monthlyMortgageInsurance = (loanAmount * configItems.MPILevel1Val) / 12;
  } else if (loanPercent >= configItems.MPILevel2) {
    monthlyMortgageInsurance = (loanAmount * configItems.MPILevel2Val) / 12;
  } else if (loanPercent > configItems.MPILevel3) {
    monthlyMortgageInsurance = (loanAmount * configItems.MPILevel3Val) / 12;
  } else {
    monthlyMortgageInsurance = 0;
  }
  return monthlyMortgageInsurance;
}

function calculateLoanMonthlyInterest(loanAmount, loanInterestRate) {
  let H = 0,
    J = 0;
  J = loanInterestRate / (12 * 100);
  H = loanAmount * J;
  return H.toFixed(2);
}

function calculatePrepaidInterestDays(estimatedClosingDate) {
  let date = new Date(estimatedClosingDate);
  var prepaidInterestDays =
    1 +
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() -
    date.getDate();
  return prepaidInterestDays;
}

function calculateLoanMonthlyPrincipalAndInterest(
  loanAmount,
  interestRate,
  yearLoan
) {
  let M = 0;
  monthlyInterest = interestRate / (12 * 100);
  numberOfMonths = yearLoan * 12;
  if (monthlyInterest != 0 && numberOfMonths != 0) {
    M =
      loanAmount *
      (monthlyInterest / (1 - Math.pow(1 + monthlyInterest, -numberOfMonths)));
  }

  return M.toFixed(2);
}

async function calculateLoanAmount(
  loanType,
  purchasePrice,
  downPaymentAmount,
  subdomain
) {
  let loanAmount = 0;
  purchasePrice = parseFloat(purchasePrice);
  let configItems = await ConfigurableItems(subdomain);
  //Calculate Loan Amount on the basis of Loan Type
  if (loanType == EnumTypes.loanType.FHA) {
    loanAmount = purchasePrice - downPaymentAmount * (1 + configItems.FHAVal1 / 100);
  }
  else if (loanType == EnumTypes.loanType.VA) {
    loanAmount = purchasePrice - downPaymentAmount * (1 + configItems.VAVal / 100);
  }
  else {
    loanAmount = purchasePrice - downPaymentAmount;
  }
  return loanAmount;
}

function calculateMonthlyLoanPaymentTotal(
  monthlyPrincipalAndInterest,
  monthlyPropertyTaxes,
  monthlyMortgageInsurance,
  monthlyHazardInsurance,
  additionalMonthlyCost
) {
  let monthlyLoanPaymentTotal;
  monthlyLoanPaymentTotal =
    parseFloat(monthlyPrincipalAndInterest) +
    parseFloat(monthlyPropertyTaxes) +
    parseFloat(monthlyHazardInsurance) +
    parseFloat(monthlyMortgageInsurance) +
    parseFloat(additionalMonthlyCost);
  return parseFloat(monthlyLoanPaymentTotal).toFixed(2);
}

// TODO: add an instruction on the ui of closing cost that calculation type can be added/customized based on the request of the client.

function createNetSheetSectionNode(
  loanType,
  financeType,
  netSheetResponse,
  subdomain
) {
  return new Promise((resolve, reject) => {
    NetsheetDivisionDefinitions.getModel(subdomain)
      .aggregate([
        {
          $lookup: {
            from: "closingcostdefinitions",
            localField: "_id",
            foreignField: "divisionDefinitionId",
            as: "closingCost"
          }
        },
        { $unwind: { path: "$closingCost" } },
        { $unwind: { path: "$closingCost.financingRequirements" } },
        { $match: { "closingCost.financingRequirements.loanType": loanType } },
        { $sort: { "closingCost._id": 1 } },
        {
          $group: {
            _id: "$_id",
            description: { $first: "$description" },
            sortOrder: { $first: "$sortOrder" },
            isActive: { $first: "$isActive" },
            color: { $first: "$color" },
            closingCost: {
              $push: {
                _id: "$closingCost._id",
                lineNumber: "$closingCost.lineNumber",
                description: "$closingCost.description",
                isDescriptionEditable: "$closingCost.isDescriptionEditable",
                splitType: "$closingCost.splitType",
                isAmountEditable: "$closingCost.isAmountEditable",
                divisionDefinitionId: "$closingCost.divisionDefinitionId",
                isActive: "$closingCost.isActive",
                calculationType: "$closingCost.calculationType",
                flatAmount: "$closingCost.flatAmount",
                explanation: "$closingCost.explanation",
                notApplicableForCash: "$closingCost.applicableForCash",
                financingRequirements: "$closingCost.financingRequirements"
              }
            }
          }
        },
        { $sort: { id: 1 } }
      ])
      .exec(async (error, result) => {
        if (error) {
          reject(error);
        } else {
          for (const netSheetSection of result) {
            for (const closingCost of netSheetSection.closingCost) {
              // SP : -1 indicates that no override is performed.
              let overrideSplit =
                closingCost.financingRequirements.splitTypeOverride != -1;
              closingCost.splitType = overrideSplit
                ? closingCost.financingRequirements.splitTypeOverride
                : closingCost.splitType;

              let overrideAmount =
                closingCost.financingRequirements.flatAmountOverride != 0;
              closingCost.flatAmount = overrideAmount
                ? closingCost.financingRequirements.flatAmountOverride
                : closingCost.flatAmount;

              /* 
                setAmount function is used to set total amount,seller amount and buyer amount
               */
              let amountObject = await setAmount(
                closingCost.calculationType,
                closingCost.flatAmount,
                closingCost.description,
                closingCost.financingRequirements.financingRequirement,
                closingCost.splitType,
                financeType,
                closingCost.notApplicableForCash,
                netSheetResponse,
                subdomain
              );
              if (
                !isNaN(amountObject.sellerAmount) &&
                amountObject.sellerAmount != 0.0
              )
                closingCost.sellerAmount = amountObject.sellerAmount.toFixed(2);
              if (
                !isNaN(amountObject.buyerAmount) &&
                amountObject.buyerAmount != 0.0
              )
                closingCost.buyerAmount = amountObject.buyerAmount.toFixed(2);
              /* 
                            replace description with dynamic value
                        */
              if (
                !!closingCost.description.match("{PI}") ||
                !!closingCost.description.match("{VFF}")
              ) {
                closingCost.description = await replaceClosingCostDefinitionDescriptionPlaceholder(
                  netSheetResponse,
                  closingCost.description
                );
              }
            }
          }
          resolve(result);
        }
      });
  });
}

function calculateBuyerTotalAmount(netSheetSection) {
  let buyerTotalAmount = 0;
  for (let section of netSheetSection) {
    for (let closingCost of section.closingCost) {
      if (!!closingCost.buyerAmount) {
        buyerTotalAmount += parseFloat(closingCost.buyerAmount);
      }
    }
  }
  return buyerTotalAmount.toFixed(2);
}

function calculateSellerTotalAmount(netSheetSection) {
  let sellerTotalAmount = 0;
  for (let section of netSheetSection) {
    for (let closingCost of section.closingCost) {
      if (!!closingCost.sellerAmount) {
        sellerTotalAmount += parseFloat(closingCost.sellerAmount);
      }
    }
  }
  return sellerTotalAmount.toFixed(2);
}

async function setAmount(
  calculationType,
  flatAmount,
  description,
  financingRequirement,
  splitType,
  financingType,
  notApplicableForCash,
  netSheetResponse,
  subdomain
) {
  let amountObject = {};
  let configItems = await ConfigurableItems(subdomain);
  /* 
        we need to define these static array in separate file
    */
  let SELLER_TAX_PRORATION_PREVHALF_TODATE = [1, 2, 3];
  let SELLER_TAX_PRORATION_TODATE = [4, 5, 6, 7, 8, 9, 10];
  let SELLER_TAX_PRORATION_JULY_TODATE = [11, 12];
  let BUYER_TAX_PRORATION_PREVHALF_TODATE = [1, 2];
  let BUYER_TAX_PRORATION_TODATE = [3, 4, 5, 6, 7, 8];
  let BUYER_TAX_PRORATION_JULY_TODATE = [9, 10, 11, 12];
  let TAX_PRORATION_CASH = BUYER_TAX_PRORATION_JULY_TODATE;
  switch (calculationType) {
    case EnumTypes.calculationType.blank:
      amountObject.totalAmount = 0;
      amountObject.sellerAmount = 0;
      amountObject.buyerAmount = 0;
      return amountObject;
    case EnumTypes.calculationType.flatAmount:
      amountObject.totalAmount = flatAmount;
      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;
    case EnumTypes.calculationType.escrowFee:
      amountObject.totalAmount = await calculateEscrowFee(
        netSheetResponse.shortSale,
        netSheetResponse.purchasePrice,
        netSheetResponse.propertyCounty,
        subdomain
      );

      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;
    case EnumTypes.calculationType.newLoanEscrowFee:
      if (netSheetResponse.financeType == EnumTypes.financeType.loan) {
        amountObject.totalAmount = configItems.NewLoanEscrowFee;
      } else {
        amountObject.totalAmount = 0;
      }
      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;
    case EnumTypes.calculationType.ownersTitleInsurancePremium:
      amountObject.totalAmount = await calculateTitlePremium(
        netSheetResponse.purchasePrice,
        netSheetResponse.propertyCounty,
        configItems.PolicyTypeMultiplier,
        subdomain
      );
      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;
    case EnumTypes.calculationType.lendersTitleInsurancePremium:
      let policyTypeMultiplier =
        netSheetResponse.financeType == EnumTypes.financeType.cash
          ? configItems.CashFinanceTypeMultiplier
          : configItems.LoanFinanceTypeMultiplier;
      console.log(policyTypeMultiplier);

      amountObject.totalAmount = await calculateTitlePremium(
        netSheetResponse.loanAmount,
        netSheetResponse.propertyCounty,
        policyTypeMultiplier,
        subdomain
      );
      console.log(amountObject.totalAmount);

      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;
    case EnumTypes.calculationType.originationFee:
      amountObject.totalAmount =
        configItems.OriginationFee * netSheetResponse.loanAmount;
      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;
    case EnumTypes.calculationType.hazardInsuranceImpounds:
      amountObject.totalAmount =
        netSheetResponse.monthlyHazardInsurance *
        configItems.HazardInsuranceImpounds;
      console.log(netSheetResponse.monthlyHazardInsurance, configItems.HazardInsuranceImpounds);

      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;
    case EnumTypes.calculationType.MPI_PMIImpounds:
      amountObject.totalAmount =
        netSheetResponse.monthlyMortgageInsurance *
        configItems.MPIOrPMIImpounds;
      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;

    case EnumTypes.calculationType.propertyTaxProration:
      let annualPropertyTaxes = netSheetResponse.annualPropertyTaxes;
      /* 
                get date from estimatedClosingDate
            */
      //let estimatedClosingDate = netSheetResponse.estimatedClosingDate.getDate();
      let estimatedClosingDate = new Date(
        netSheetResponse.estimatedClosingDate
      );
      /* 
                get month from estimatedClosingDate
            */
      let estimatedClosingMonth = estimatedClosingDate.getMonth() + 1;
      let jan1 = new Date(estimatedClosingDate.getFullYear(), 0, 1, 0, 0, 0);
      let july1 = new Date(estimatedClosingDate.getFullYear(), 6, 1, 0, 0, 0);
      let december31 = new Date(
        estimatedClosingDate.getFullYear(),
        11,
        31,
        0,
        0,
        0
      );
      amountObject.totalAmount = 0;
      /* calculate seller amount */
      let sellerAmount = 0;
      if (
        financingType == EnumTypes.financeType.cash &&
        TAX_PRORATION_CASH.includes(estimatedClosingMonth)
      ) {
        sellerAmount =
          (annualPropertyTaxes / 365) *
          calculateTotalDaysBetweenDates(jan1, estimatedClosingDate);
      } else if (
        SELLER_TAX_PRORATION_PREVHALF_TODATE.includes(estimatedClosingMonth)
      ) {
        sellerAmount =
          (annualPropertyTaxes / 365) *
          calculateTotalDaysBetweenDates(jan1, estimatedClosingDate) +
          annualPropertyTaxes * 0.5;
      } else if (SELLER_TAX_PRORATION_TODATE.includes(estimatedClosingMonth)) {
        sellerAmount =
          (annualPropertyTaxes / 365) *
          calculateTotalDaysBetweenDates(jan1, estimatedClosingDate);
      } else if (
        SELLER_TAX_PRORATION_JULY_TODATE.includes(estimatedClosingMonth)
      ) {
        sellerAmount =
          (annualPropertyTaxes / 365) *
          (calculateTotalDaysBetweenDates(jan1, estimatedClosingDate) -
            calculateTotalDaysBetweenDates(jan1, july1));
        console.log('proration :', annualPropertyTaxes);

      }
      /*calculate buyer amount */
      let buyerAmount = 0;
      if (
        financingType == EnumTypes.financeType.cash &&
        TAX_PRORATION_CASH.includes(estimatedClosingMonth)
      ) {
        buyerAmount =
          (annualPropertyTaxes / 365) *
          (calculateTotalDaysBetweenDates(jan1, december31) -
            calculateTotalDaysBetweenDates(jan1, estimatedClosingDate));
      } else if (
        BUYER_TAX_PRORATION_PREVHALF_TODATE.includes(estimatedClosingMonth)
      ) {
        buyerAmount =
          ((annualPropertyTaxes / 365) *
            calculateTotalDaysBetweenDates(jan1, estimatedClosingDate) +
            annualPropertyTaxes * 0.5) *
          -1;
      } else if (BUYER_TAX_PRORATION_TODATE.includes(estimatedClosingMonth)) {
        buyerAmount =
          (annualPropertyTaxes / 365) *
          calculateTotalDaysBetweenDates(jan1, estimatedClosingDate) *
          -1;
      } else if (
        BUYER_TAX_PRORATION_JULY_TODATE.includes(estimatedClosingMonth)
      ) {
        buyerAmount =
          (annualPropertyTaxes / 365) *
          (calculateTotalDaysBetweenDates(jan1, estimatedClosingDate) -
            calculateTotalDaysBetweenDates(jan1, july1)) *
          -1;
      }
      amountObject.sellerAmount = sellerAmount;
      amountObject.buyerAmount = buyerAmount;
      return amountObject;
    case EnumTypes.calculationType.brokerageFee:
      amountObject.totalAmount = netSheetResponse.totalRealtorCommision;
      amountObject.sellerAmount = netSheetResponse.totalRealtorCommision;
      amountObject.buyerAmount = netSheetResponse.brokerageCommision;
      return amountObject;
    case EnumTypes.calculationType.downPayment:
      amountObject.totalAmount = netSheetResponse.downPaymentAmount;
      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;
    case EnumTypes.calculationType.prepaidInterestAmount:
      amountObject.totalAmount =
        ((netSheetResponse.loanAmount * (netSheetResponse.loanRate / 100)) /
          365) *
        netSheetResponse.prepaidInterestDays;
      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;
    case EnumTypes.calculationType.propertyTaxImpounds:
      let monthlyPropertyTaxes = 0;
      monthlyPropertyTaxes = netSheetResponse.annualPropertyTaxes / 12;
      let closingDate = new Date(netSheetResponse.estimatedClosingDate);
      let closingMonth = closingDate.getMonth() + 1;
      if (closingMonth == 1 || closingMonth == 7) {
        amountObject.totalAmount =
          configItems.PropertyTaxImpoundsVal1 * monthlyPropertyTaxes;
      } else if (closingMonth == 2 || closingMonth == 8) {
        amountObject.totalAmount =
          configItems.PropertyTaxImpoundsVal2 * monthlyPropertyTaxes;
      } else if (closingMonth == 3 || closingMonth == 9) {
        amountObject.totalAmount =
          configItems.PropertyTaxImpoundsVal3 * monthlyPropertyTaxes;
      } else if (closingMonth == 4 || closingMonth == 10) {
        amountObject.totalAmount =
          configItems.PropertyTaxImpoundsVal4 * monthlyPropertyTaxes;
      } else if (closingMonth == 5 || closingMonth == 11) {
        amountObject.totalAmount =
          configItems.PropertyTaxImpoundsVal5 * monthlyPropertyTaxes;
      } else if (closingMonth == 6 || closingMonth == 12) {
        amountObject.totalAmount =
          configItems.PropertyTaxImpoundsVal6 * monthlyPropertyTaxes;
      }
      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;
    case EnumTypes.calculationType.USDAfee:
      amountObject.totalAmount =
        configItems.USDAFee * configItems.USDAFeeMultiplier;
      setSellerBuyerAmount(
        amountObject,
        splitType,
        financingRequirement,
        financingType,
        notApplicableForCash
      );
      return amountObject;
    default:
      break;
  }
  return amountObject;
}

function replaceClosingCostDefinitionDescriptionPlaceholder(
  netSheetResponse,
  description
) {
  if (!!description.match("{PI}")) {
    description = description.replace(
      "{PI}",
      netSheetResponse.prepaidInterestDays
    );
    return description;
  } else if (!!description.match("{VFF}")) {
    if (netSheetResponse.loanType == EnumTypes.loanType.VA) {
      description = description.replace(
        "{VFF}",
        (
          netSheetResponse.purchasePrice -
          (netSheetResponse.downPaymentAmount * 3.3) / 100
        ).toFixed(2)
      );
    } else {
      description = description.replace("{VFF}", "");
      description = description.replace("()", "");
    }
    return description;
  }
}

function setSellerBuyerAmount(
  amountObject,
  splitType,
  financingRequirement,
  financingType,
  notApplicableForCash
) {
  /* 
        setting seller and buyer amount based on financing requirment value
    */
  if (
    financingRequirement == EnumTypes.financingRequirementType.notApplicable
  ) {
    amountObject.buyerAmount = 0;
    amountObject.sellerAmount = 0;
  } else {
    if (splitType == EnumTypes.splitType.buyer) {
      amountObject.buyerAmount = amountObject.totalAmount;
      amountObject.sellerAmount = 0;
    } else if (splitType == EnumTypes.splitType.seller) {
      amountObject.buyerAmount = 0;
      amountObject.sellerAmount = amountObject.totalAmount;
    } else if (splitType == EnumTypes.splitType.split) {
      amountObject.buyerAmount = amountObject.totalAmount / 2;
      amountObject.sellerAmount = amountObject.totalAmount / 2;
    }
  }
  return amountObject;
}

/* 
    need to add top condition in query
*/
async function calculateTitlePremium(
  purchasePrice,
  county,
  policyTypeMultiplier,
  subdomain
) {
  let configItems = await ConfigurableItems(subdomain);
  return new Promise((resolve, reject) => {
    let totalTitlePremium = 0;
    let premiumCutOff = 0;
    let premiumIncrementalAmount = 0;
    let premiumIncrementalChange = 0;

    premiumCutOff = configItems.TitlePremiumCutOff;
    premiumIncrementalAmount = configItems.TitlePremiumIncrementalAmount;
    premiumIncrementalChange = configItems.PremiumIncrementalChange;

    if (purchasePrice <= premiumCutOff) {
      let model = TitlePremiumsLookup.getModel(subdomain);
      TitlePremiumsLookup.getModel(subdomain).find(
        {
          county: county,
          amount: { $gte: purchasePrice }
          //effectiveDate : {$lte : new Date() }
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            if (result.length > 0) {
              if (result[0].cost != null)
                totalTitlePremium =
                  (policyTypeMultiplier / 100) * result[0].cost;
            }
          }
          resolve(Math.ceil(totalTitlePremium));
        }
      );
    } else {
      // NB : Not found in config item
      let minTitlePremium = configItems.MinTitlePremium;
      for (
        let minPurchasePrice = premiumCutOff + premiumIncrementalAmount;
        minPurchasePrice <= configItems.MinimumPurchaseValueCutoff;
        minPurchasePrice += premiumIncrementalAmount
      ) {
        if (purchasePrice <= minPurchasePrice) {
          totalTitlePremium = (policyTypeMultiplier / 100) * minTitlePremium;
        } else minTitlePremium += premiumIncrementalChange;
      }
      resolve(Math.ceil(totalTitlePremium));
    }
  });
}

function calculateTotalDaysBetweenDates(startDate, endDate) {
  let difference = endDate - startDate;
  let oneDay = 1000 * 60 * 60 * 24;
  var days = Math.floor(difference / oneDay);
  return days;
}

async function calculateEscrowFee(shortSale, purchasePrice, county, subdomain) {
  let configItems = await ConfigurableItems(subdomain);
  return new Promise((resolve, reject) => {
    let totalEscrowFee = 0;
    EscrowFeeLookup.getModel(subdomain)
      .find({
        isShortSale: shortSale,
        county: county,
        amount: { $gt: purchasePrice }
        //effectiveDate : {$lte : new Date() }
      })
      .exec((error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result.length > 0) {
            if (result[0].escrowFee != null) {
              totalEscrowFee = result[0].escrowFee;
            }
          }

          let basis =
            purchasePrice > configItems.EscrowFeeCutOff
              ? configItems.EscrowFeeCutOff
              : purchasePrice;
          console.log('_.First Cutoff : ', configItems.EscrowFeeCutOff, '_basis : ', basis)

          if (purchasePrice > configItems.EscrowFeeCutOff) {
            basis =
              purchasePrice > configItems.EscrowFee2ndCutOff
                ? configItems.EscrowFee2ndCutOff
                : purchasePrice;
            let cutoffExtraAmount =
              Math.ceil(
                (basis - configItems.EscrowFeeCutOff) /
                configItems.EscrowFeeIncrementalAmount
              ) * configItems.EscrowFeeIncrementalChange;
            totalEscrowFee = totalEscrowFee + cutoffExtraAmount;
          }
          if (purchasePrice > configItems.EscrowFee2ndCutOff) {
            let cutoff2ndExtraAmount =
              Math.ceil(
                (purchasePrice - configItems.EscrowFee2ndCutOff) /
                configItems.EscrowFee2ndIncrementalAmount
              ) * configItems.EscrowFee2ndIncrementalCharge;
            totalEscrowFee = totalEscrowFee + cutoff2ndExtraAmount;
          }
          resolve(totalEscrowFee);
        }
      });
  });
}

module.exports.genNetSheet = function (request) {
  console.time("Final");
  return new Promise(async (resolve, reject) => {
    let netSheetContactModel = NetSheetContact.getModel(
      request.headers["subdomain"]
    );
    let netSheetContact = new netSheetContactModel(request.body);
    let configItems = await ConfigurableItems(request.headers["subdomain"]);

    /**
     * Save netsheet contact details to db
     */
    console.time("SaveNetsheetContact");
    netSheetContact.save(async function (error, result) {
      if (error) {
        Logger.log("saving netsheet request", error, "generateNetSheet");
        reject({
          message: "An error occured on saving netsheet request details",
          code: 500
        });
      } else {
        console.timeEnd("SaveNetsheetContact");
        /* 
                    create response object
                */
        let netSheetResponse = {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          contactEmail: request.body.contactEmail,
          contactCompany: request.body.contactCompany,
          propertyAddress: request.body.propertyAddress,
          propertyCounty: request.body.propertyCounty,
          /* 
                        direct mapping field 
                    */
          netSheetType: request.body.netSheetType,
          estimatedClosingDate: new Date(
            request.body.estimatedClosingDate
          ).toDateString(),
          purchasePrice: parseFloat(request.body.purchasePrice),
          downPaymentType: request.body.downPaymentType,
          annualPropertyTaxes: parseFloat(request.body.annualPropertyTaxes),
          realTorCommisionPercent: parseFloat(
            request.body.realTorCommisionPercent
          ),
          brokerageCommision: parseFloat(request.body.brokerageCommision),
          shortSale: request.body.shortSale
        };
        console.time("calculateDownPayment");
        netSheetResponse.downPaymentAmount = await calculateDownPayment(
          request.body.downPaymentType,
          request.body.purchasePrice,
          request.body.downPaymentPercent
        );
        console.timeEnd("calculateDownPayment");
        console.time("calculateTotalRealtorCommission");
        let totalRealtorCommision = await calculateTotalRealtorCommission(
          request.body.brokerageCommision,
          request.body.realTorCommisionPercent,
          request.body.purchasePrice
        );
        console.timeEnd("calculateTotalRealtorCommission");
        /* 
                    add total realtor commision to response object
                */
        netSheetResponse.totalRealtorCommision = totalRealtorCommision;
        /* 
                   add buyer name in response object. Buyer name will empty in the initial cost estimate.
                   It may be updated in output form
               */
        netSheetResponse.buyerName = "";
        /* 
                    add seller name in response object. Seller name will empty in the initial cost estimate.
                    It may be updated in output form
                */
        netSheetResponse.sellerName = "";
        /* 
                    add payoff load amount in response object. payoff load amount will empty in the initial cost estimate.
                    It may be updated in output form
                */
        netSheetResponse.payOffLoanAmount = 0;
        /* 
                    condition to be checked for loan type selected to be cash
                */
        if (
          request.body.financeType == EnumTypes.financeType.cash ||
          request.body.loanType == EnumTypes.loanType.cash
        ) {
          /* 
                        add following field to response object with 0 or default value
                    */
          netSheetResponse.loanAmount = 0;
          netSheetResponse.loanType = request.body.loanType;
          netSheetResponse.loanTermYears = 0;
          netSheetResponse.loanRate = 0;
          netSheetResponse.monthlyPrincipalAndInterest = 0;
          netSheetResponse.monthlyPropertyTaxes = 0;
          netSheetResponse.monthlyHazardInsurance = 0;
          netSheetResponse.monthlyMortgageInsurance = 0;
          netSheetResponse.additionalMonthlyCost = 0;
          netSheetResponse.totalMonthlyLoanPayment = 0;
        } else {
          /* 
                        finance calculation
                    */
          netSheetResponse.financeType = request.body.financeType;
          netSheetResponse.loanTermYears = parseFloat(
            request.body.loanTermYears
          );
          netSheetResponse.loanRate = parseFloat(request.body.loanRate);
          netSheetResponse.loanType = request.body.loanType;
          netSheetResponse.additionalMonthlyCost = 0;
          console.time("calculateMonthlyHazardInsurance");
          netSheetResponse.monthlyHazardInsurance =
            await calculateMonthlyHazardInsurance(
              request.body.purchasePrice,
              request.headers["subdomain"]
            )
          console.timeEnd("calculateMonthlyHazardInsurance");
          console.time("calculateLoanAmount");
          netSheetResponse.loanAmount = await calculateLoanAmount(
            request.body.loanType,
            request.body.purchasePrice,
            netSheetResponse.downPaymentAmount,
            request.headers["subdomain"]
          );
          console.timeEnd("calculateLoanAmount");

          console.time("calculatePrepaidInterestDays");
          netSheetResponse.prepaidInterestDays = await calculatePrepaidInterestDays(
            request.body.estimatedClosingDate
          );
          console.timeEnd("calculatePrepaidInterestDays");

          console.time("calculateLoanMonthlyInterest");
          netSheetResponse.monthlyInterest = await calculateLoanMonthlyInterest(
            netSheetResponse.loanAmount,
            parseFloat(request.body.loanRate)
          );
          console.timeEnd("calculateLoanMonthlyInterest");

          console.time("calculateLoanMonthlyPrincipalAndInterest");
          netSheetResponse.monthlyPrincipalAndInterest = await calculateLoanMonthlyPrincipalAndInterest(
            netSheetResponse.loanAmount,
            parseFloat(request.body.loanRate),
            parseFloat(request.body.loanTermYears)
          );
          console.timeEnd("calculateLoanMonthlyPrincipalAndInterest");
          /* 
                        get monthly property taxes and add to the netSheet response object
                    */
          console.time("calculateMonthlyPropertyTaxes");
          netSheetResponse.monthlyPropertyTaxes = await calculateMonthlyPropertyTaxes(
            parseFloat(request.body.annualPropertyTaxes)
          );
          console.timeEnd("calculateMonthlyPropertyTaxes");
          /* 
                        get monthly mortgage insurance and add to the netSheet response object
                    */
          /* 
                        PMI - private mortgage insurance
                    */
          console.time("calculateMonthlyPMI");
          netSheetResponse.monthlyMortgageInsurance = await calculateMonthlyPMI(
            parseFloat(request.body.purchasePrice),
            netSheetResponse.loanAmount,
            request.body.loanType,
            request.headers["subdomain"]
          );
          console.timeEnd("calculateMonthlyPMI");
          /* 
                        get total monthly loan payment and add to the netSheet response object
                    */
          console.time("calculateMonthlyLoanPaymentTotal");
          netSheetResponse.totalMonthlyLoanPayment = await calculateMonthlyLoanPaymentTotal(
            netSheetResponse.monthlyPrincipalAndInterest,
            netSheetResponse.monthlyPropertyTaxes,
            netSheetResponse.monthlyMortgageInsurance,
            netSheetResponse.monthlyHazardInsurance,
            netSheetResponse.additionalMonthlyCost
          );
          console.timeEnd("calculateMonthlyLoanPaymentTotal");
        }

        if (netSheetResponse.loanType == EnumTypes.loanType.ownerCarryBack) {
          netSheetResponse.ownerFinancingAmount = netSheetResponse.loanAmount;
          netSheetResponse.monthlyPropertyTaxes +=
            configItems.OCBMonthlyPropertyTaxesIncrementValue;
          netSheetResponse.totalMonthlyLoanPayment +=
            netSheetResponse.monthlyPropertyTaxes;
        } else {
          netSheetResponse.ownerFinancingAmount = 0;
        }
        /* 
                    add cost sheet section node to response 
                */
        console.time("createNetSheetSectionNode");
        netSheetResponse.netSheetSection = await createNetSheetSectionNode(
          request.body.loanType,
          request.body.financeType,
          netSheetResponse,
          request.headers["subdomain"]
        );
        console.timeEnd("createNetSheetSectionNode");

        console.time("calculateBuyerTotalAmount");
        netSheetResponse.buyerTotalAmount = await calculateBuyerTotalAmount(
          netSheetResponse.netSheetSection
        );
        console.timeEnd("calculateBuyerTotalAmount");

        console.time("calculateSellerTotalAmount");
        netSheetResponse.sellerTotalAmount = await calculateSellerTotalAmount(
          netSheetResponse.netSheetSection
        );
        console.timeEnd("calculateSellerTotalAmount");

        netSheetResponse.netSellerProceeds =
          netSheetResponse.purchasePrice -
          netSheetResponse.payOffLoanAmount -
          netSheetResponse.sellerTotalAmount;
        netSheetResponse.closingSellerProceeds =
          netSheetResponse.netSellerProceeds -
          netSheetResponse.ownerFinancingAmount;
        console.timeEnd("Final");

        //for notification user
        let netSheetGeneratedDate = netSheetContact.generatedDate;
        let userIds = await orderManager.getNotificationSettingUsersId(request.headers["subdomain"], 'NetSheetGenerated')
        if (userIds.length > 0) {
          notification.netSheetGenerated(request.headers["subdomain"], netSheetGeneratedDate, userIds)
        }
        resolve(netSheetResponse);
      }
    });
  });
};

// Generate pdf and send it to mail.
exports.mailNetsheetCostEstimate = function (request, response) {
  return new Promise((resolve, reject) => {
    pdfConversion(
      {
        paperSize: {
          format: "A3",
          orientation: "landscape"
        },
        html: NetSheetEstimateTemplate.render(request.body)
      },
      function (err, pdf) {
        if (!err) {
          var netSheetPDF = fs.createWriteStream(
            "temp/NetSheetTransaction.pdf"
          );
        } else {
          Logger.log("Net Sheet PDF conversion ", error, "pdfConversion");
          reject({
            code: 500,
            message: "An error occurred. Please try again after sometime."
          });
        }
        pdf.stream.pipe(netSheetPDF);
        mailPDF(
          request.body.contactEmail,
          request.body.firstName,
          request.body.lastName
        )
          .then(() => {
            resolve({
              code: 200,
              message: "The pdf has been mailed on the provided contact email."
            });
          })
          .catch(error => {
            Logger.log(
              "Error while sending netsheet pdf to mail",
              error,
              "sendNetsheetResultPdf"
            );
            reject({
              code: 500,
              message: "An error occurred. Please try after sometime."
            });
          });
      }
    );
  });
};

function mailPDF(recipient, firstName, lastName) {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: "test@titletransactiondealer.com",
      to: recipient,
      subject: "TTD Net Sheet Estimated Costs Calculation PDF",
      html: template.emailTemplate("netsheetEstimate", {
        fName: firstName,
        lName: lastName
      }),
      attachments: [
        {
          path: "temp/NetSheetTransaction.pdf"
        }
      ]
    };
    mail_config.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        Logger.log(
          "While sending mail for netsheet estimate to " + recipient,
          error,
          "sendMail"
        );
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
