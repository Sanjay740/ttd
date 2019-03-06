let express = require("express");
let router = express.Router();
let JWT = require("../util/authentication");

const netSheetController = require("../controllers/netsheet.controller");
const netsheetAdminController = require("../controllers/netsheet.admin.controller");
router.post("/generateNetSheet", netSheetController.generateNetSheet);
router.post(
  "/sendNetsheetResultPdf",
  netSheetController.mailNetsheetCostEstimate
);

// County
router.post("/addCounty", JWT.authenticate, netsheetAdminController.addCounty);
router.post(
  "/updateCounty",
  JWT.authenticate,
  netsheetAdminController.updateCounty
);
router.get("/getCounties",JWT.authenticate, netsheetAdminController.listCounties);
router.get(
  "/getPaginatedCounties",
  JWT.authenticate,
  netsheetAdminController.getPaginatedCounties
);
router.get("/checkCounty", JWT.authenticate,netsheetAdminController.checkCounty);

// Division Definition
// router.post('/addDivisionDefinition', netsheetAdminController.addDivisionDefinition)
router.post(
  "/updateDivisionDefinition",
  JWT.authenticate,
  netsheetAdminController.updateDivisionDefinition
);
// router.delete('/deleteDivisionDefinition/:id', netsheetAdminController.deleteDivisionDefinition)
router.get(
  "/getDivisionDefinitions",
  JWT.authenticate,
  netsheetAdminController.getDivisionDefinitions
);
router.get(
  "/getDivisionDefinitionById/:id",
  JWT.authenticate,
  netsheetAdminController.getDivisionDefinitionById
);
// router.get('/checkOrderSort', netsheetAdminController.checkOrderSort)

// Escrow Fee Premium
router.post(
  "/addEscrowFeePremium",
  JWT.authenticate,
  netsheetAdminController.addEscrowFeePremium
);
router.post(
  "/updateEscrowFeePremium",
  JWT.authenticate,
  netsheetAdminController.updateEscrowFeePremium
);
router.delete(
  "/deleteEscrowFeePremium/:id",
  JWT.authenticate,
  netsheetAdminController.deleteEscrowFeePremium
);
router.get(
  "/getEscrowFeePremiums",
  JWT.authenticate,
  netsheetAdminController.getEscrowFeePremium
);

// Closing Cost Definition
// router.post('/addClosingCostDefinition', netsheetAdminController.addClosingCostDefinition)
router.post(
  "/updateClosingCostDefinition",
  JWT.authenticate,
  netsheetAdminController.updateClosingCostDefinition
);
// router.delete('/deleteClosingCostDefinition/:id', netsheetAdminController.deleteClosingCostDefinition)
router.get(
  "/getClosingCostDefinitions/:id",
  JWT.authenticate,
  netsheetAdminController.getClosingCostDefinition
);
router.get(
  "/getClosingCostDefinitionById/:id",
  JWT.authenticate,
  netsheetAdminController.getClosingCostDefinitionById
);
// router.get('/checkLineNumber', netsheetAdminController.checkLineNumber)

// Financial Requirements
// router.post('/addFinancingRequirement/:ccdId', netsheetAdminController.addFinancingRequirement)
router.post(
  "/updateFinancingRequirement/:ccdId",
  JWT.authenticate,
  netsheetAdminController.updateFinancingRequirement
);
// router.delete('/deleteFinancingRequirement', netsheetAdminController.deleteFinancingRequirement)
router.get(
  "/getFinancingRequirements/:ccdId",
  JWT.authenticate,
  netsheetAdminController.getFinancingRequirements
);
// router.get('/checkLoanTypesForFinancingRequirement', netsheetAdminController.checkLoanTypesForFinancingRequirement)

// Title Premium
router.post(
  "/addTitlePremium",
  JWT.authenticate,
  netsheetAdminController.addTitlePremium
);
router.post(
  "/updateTitlePremium",
  JWT.authenticate,
  netsheetAdminController.updateTitlePremium
);
router.delete(
  "/deleteTitlePremium/:id",
  JWT.authenticate,
  netsheetAdminController.deleteTitlePremium
);
router.get(
  "/getTitlePremiums",
  JWT.authenticate,
  netsheetAdminController.getTitlePremiums
);

// Configurable items
router.post(
  "/updateConfigurableItem",
  JWT.authenticate,
  netsheetAdminController.updateConfigurableItem
);
router.get(
  "/getConfigurableItems",
  JWT.authenticate,
  netsheetAdminController.getConfigurableItems
);

// Report
router.get(
  "/getActivityReport",
  JWT.authenticate,
  netsheetAdminController.getActivityReport
);
router.get(
  "/getCustomerReport",
  JWT.authenticate,
  netsheetAdminController.getCustomerReport
);

module.exports = router;
