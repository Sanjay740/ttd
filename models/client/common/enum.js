const TaskType = ["PreClosing", "PostClosing"];
const componentType = ["Document", "PredefinedForm", "CustomizedForm", "CalenderForm"];

// Add: permission to act Add
// Edit: permission to act Edit
// View: permission to act View
// Delete: permission to act delete items
// All: permission to act all above operation
const actions = ["Add", "Edit", "Delete", "View", "All"];

// New: the transactions which are either submitted by the end user through RequestedServices portal.
// InProgress: the transaction which are in Progress.
// OnHold: the transaction has been put on hold for sometime.
// Completed: transaction is completed successfully.
const transactionStatus = ["New", "InProgress", "Closed", "OnHold"];

// Requested : the task status, when it is requested to a contact.
// Received: the task status, when it is submitted by the contact after fulfillment.
// Completed: the task status, when this is seen/reviewed by the agent/respective party
// Rejected: the task status, when something is wrong/incomplete and it is rejected by the agent/respective party.
// Pending: the task status, when due date for completing the task is over, this will be done by cron job.
const taskStatus = [
  "New",
  "Requested",
  "Received",
  "Pending",
  "Rejected",
  'Closed',
  "Completed"
];
const orderStatus = [
  'Imported', 'Rejected', 'New'
]

const permissionTypes = ['grant', 'deny']

module.exports = {
  taskType: TaskType,
  componentType: componentType,
  action: actions,
  transactionStatus: transactionStatus,
  taskStatus: taskStatus,
  orderStatus: orderStatus,
  permissionTypes: permissionTypes
};
