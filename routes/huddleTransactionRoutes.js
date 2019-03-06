let express = require("express");
let router = express.Router();
let transactionController = require("../controllers/transaction.controller");
let chatController = require("../controllers/chat.controller");

let JWT = require("../util/authentication");
const documentManager = require('../managers/document.manager')

router.post("/updateTransactionTask", JWT.authenticate, transactionController.updateTransactionTask);

router.post("/inviteUsers", JWT.authenticate, transactionController.inviteUsers)
router.get("/listContactsForInvitation/:id", JWT.authenticate, transactionController.listContactsForInvitation)

//Transaction Routes
router.get("/getTransactionNumber", transactionController.getTransactionNumber);
router.get("/getTransactions/:status", transactionController.getTransactions);
router.get("/getTransaction", transactionController.getTransaction);
router.post("/startTransaction", transactionController.startTransaction);
router.post("/updateTransaction", documentManager.uploadFile, transactionController.updateTransaction);
router.get('/getUsersByRole', transactionController.getUsersByRole);
router.post('/assignContacts', transactionController.assignContacts);
router.post('/assignTask', transactionController.assignTask);
router.get('/updateTaskStatus', transactionController.updateTaskStatus);

router.post('/updateTransactionStatus', transactionController.updateTransactionStatus);
router.get("/getTransactionsbyUserId", JWT.authenticate, transactionController.getTransactionsbyUserId);
router.post("/getRoomId", JWT.authenticate, chatController.getRoomId);
router.get("/getRooms", JWT.authenticate, chatController.getRooms);
router.get("/getConversations", JWT.authenticate, chatController.getConversations);

router.post("/saveFormData", JWT.authenticate, documentManager.uploadFile, transactionController.saveFormData);
router.get("/getFormData", JWT.authenticate, transactionController.getFormData);
router.post("/taskDocumentUpload", documentManager.uploadFile, transactionController.taskDocumentUpload);

router.post("/saveCalendarEvent", JWT.authenticate, transactionController.saveCalendarEvent);
router.get("/getCalendarEvent", JWT.authenticate, transactionController.getCalendarEvent)
router.post('/updateUserStatus', JWT.authenticate, transactionController.updateUserStatus)
router.post('/addNewTransactionContact', JWT.authenticate, transactionController.addNewTransactionContact)
router.get('/getExistingTransactionContacts', JWT.authenticate, transactionController.getExistingTransactionContacts)

router.post('/updateQuestionnaire', JWT.authenticate, transactionController.saveFormData)
router.get('/getDataSet', JWT.authenticate, transactionController.getDataSet);

module.exports = router;
