let express = require("express");
let router = express.Router();
let JWT = require("../util/authentication");
const documentManager = require('../managers/document.manager')
const huddleConfigSettingsController = require("../controllers/configurationSettings.controller");
/* _____________________________________________________________________________________
                                 Huddle Routes
_______________________________________________________________________________________*/
//Roles
router.get(
  "/getRoles",
  JWT.authenticate,
  huddleConfigSettingsController.listRoles
);
router.post(
  "/addRole",
  JWT.authenticate,
  huddleConfigSettingsController.addRole
);
router.post(
  "/updateRole",
  JWT.authenticate,
  huddleConfigSettingsController.updateRole
);
router.delete(
  "/deleteRole/:id",
  JWT.authenticate,
  huddleConfigSettingsController.deleteRole
);
router.get(
  "/getRole",
  JWT.authenticate,
  huddleConfigSettingsController.getRole
);

//View Setting
router.get("/getUserGroups", JWT.authenticate, huddleConfigSettingsController.getUserGroups);
router.post(
  "/updateAccessRight",
  huddleConfigSettingsController.updateAccessRight
);
//ManageForms
router.get(
  "/listCustomizedForms",
  JWT.authenticate,
  huddleConfigSettingsController.listCustomizedForms
);
router.delete(
  "/deleteFormbuilderorms/:id",
  JWT.authenticate,
  huddleConfigSettingsController.deleteFormbuilderorms
);

//FormBuilder
router.post(
  "/createForm",
  JWT.authenticate,
  huddleConfigSettingsController.createForm
);
router.get(
  "/getFormbuilderFormById/:id",
  JWT.authenticate,
  huddleConfigSettingsController.getFormbuilderFormById
);
router.post(
  "/editFormBuilderForm/:id",
  JWT.authenticate,
  huddleConfigSettingsController.editFormBuilderForm
);

// Users
router.get(
  "/getUsers",
  JWT.authenticate,
  huddleConfigSettingsController.listUsers
);
router.post(
  "/addUsers",
  JWT.authenticate,
  documentManager.uploadFile,
  huddleConfigSettingsController.addUsers
);
router.get(
  "/getUserById/:id",
  huddleConfigSettingsController.getUserById
);

router.post(
  "/updateUser",
  JWT.authenticate,
  documentManager.uploadFile,
  huddleConfigSettingsController.updateUser
);

router.post('/createUserGroup', JWT.authenticate, huddleConfigSettingsController.createUserGroup)
router.get('/getUserGroupById', JWT.authenticate, huddleConfigSettingsController.getUserGroupById)
router.post('/updateUserGroup', JWT.authenticate, huddleConfigSettingsController.updateUserGroup)
router.delete('/deleteUserGroup', JWT.authenticate, huddleConfigSettingsController.deleteUserGroup)




//Admin Task
router.post(
  "/addTask",
  JWT.authenticate,
  huddleConfigSettingsController.addTask
);
router.get(
  "/getTasks",
  JWT.authenticate,
  huddleConfigSettingsController.getTasks
);
router.post(
  "/updateTask",
  JWT.authenticate,
  huddleConfigSettingsController.updateTask
);
router.delete(
  "/deleteTask",
  JWT.authenticate,
  huddleConfigSettingsController.deleteTask
);
router.get(
  "/getTaskByComponentType",
  JWT.authenticate,
  huddleConfigSettingsController.getTaskByComponentType
);

//Admin workflow
router.get(
  "/getWorkflows",
  // JWT.authenticate,
  huddleConfigSettingsController.getWorkflows
);
router.post(
  "/saveWorkflow",
  JWT.authenticate,
  huddleConfigSettingsController.saveWorkflow
);
router.post("/updateWorkflow", huddleConfigSettingsController.updateWorkflow);
// router.post(
//   "/transactionsaveWorkflow",
//   huddleConfigSettingsController.handleRequest
// );
router.delete(
  "/deleteWorkflow",
  JWT.authenticate,
  huddleConfigSettingsController.deleteWorkflow
);
router.delete("/deleteWorkflow", huddleConfigSettingsController.deleteWorkflow);


//State County Configuration
router.post("/configureStateCounty", huddleConfigSettingsController.configureStateCounty)
router.post("/getAllStatesCounties", huddleConfigSettingsController.getAllStatesCounties)
router.post("/getAllConfiguredStatesCounties", huddleConfigSettingsController.getAllConfiguredStatesCounties)
router.get("/deleteSelectedStateCounty", huddleConfigSettingsController.deleteSelectedStateCounty)
router.get("/removeSelectedCounty", huddleConfigSettingsController.removeSelectedCounty)
router.get("/getEditItemDetail", huddleConfigSettingsController.getEditItemDetail)
router.post("/updateStateCounties", huddleConfigSettingsController.updateStateCounties)


//CLosing Location 
router.post("/getConfiguredStates", huddleConfigSettingsController.getConfiguredStates);
router.post("/addClosingLocation", huddleConfigSettingsController.addClosingLocation);
router.get("/getClosingLocations", huddleConfigSettingsController.getClosingLocations);
router.get("/deleteClosingLocation", huddleConfigSettingsController.deleteClosingLocation)
router.get("/getClosingLocationById", huddleConfigSettingsController.getClosingLocationById)
router.post("/updateClosingLocation", huddleConfigSettingsController.updateClosingLocation)

//Schedule Closing
router.post("/addClosingSchedule", huddleConfigSettingsController.addClosingSchedule)


//Closing team
router.post('/updateClosingTeam', JWT.authenticate, huddleConfigSettingsController.updateClosingTeam)
router.get('/getClosingTeam', JWT.authenticate, huddleConfigSettingsController.getClosingTeam)

router.get(
  "/getTransactionNumber",
  JWT.authenticate,
  huddleConfigSettingsController.getTransactionNumber
);
router.post(
  "/saveTransactionNumber",
  JWT.authenticate,
  huddleConfigSettingsController.saveTransactionNumber
);
router.post(
  "/updateTransactionNumber",
  JWT.authenticate,
  huddleConfigSettingsController.updateTransactionNumber
);
// Notification
router.get('/getNotificationSetting', huddleConfigSettingsController.getNotificationSetting);
router.post('/updateNotificationSetting', huddleConfigSettingsController.updateNotificationSetting)


module.exports = router;
