module.exports.NotificationTypes = [
    { type: "NetSheetGenerated", module: "NetSheet", id: null, seen: false, userIds: [], data: null, backGroundColor: "#ece2ec", fontStyle: 'oblique', message: "NetSheet is generated" },
    { type: "ServiceRequested", module: "RequestedService", id: null, seen: false, userIds: [], data: null, backGroundColor: "#ece2ec", fontStyle: 'oblique', message: "A ${orderType} Service has been requested" },
    { type: "ServiceRequestProcessed", module: "RequestedService", id: null, seen: false, userIds: [], data: null, backGroundColor: "#ece2ec", fontStyle: 'oblique', message: "A New Transaction has been processed" },
    { type: "FormTaskAssigned", module: "Huddle", id: null, seen: false, userIds: [], data: null, backGroundColor: "#ece2ec", fontStyle: 'oblique', message: "${TaskName} has been assigned to you" },
    { type: "FormTaskSubmitted", module: "Huddle", id: null, seen: false, userIds: [], data: null, backGroundColor: "#ece2ec", fontStyle: 'oblique', message: "${userName} has completed the ${taskName} task" },
    { type: "DocumentTaskAssigned", module: "Huddle", id: null, seen: false, userIds: [], data: null, backGroundColor: "#ece2ec", fontStyle: 'oblique', message: "You need to submit the ${documentName}" },
    { type: "DocumentTaskSubmitted", module: "Huddle", id: null, seen: false, userIds: [], data: null, backGroundColor: "#ece2ec", fontStyle: 'oblique', message: "${userName} has uploaded document ${documentName}" },
    { type: "ClosingScheduled", module: "Huddle", id: null, seen: false, userIds: [], data: null, backGroundColor: "#ece2ec", fontStyle: 'oblique', message: "Closing for ${transactionNumber} is scheduled on ${closingDateTime} at ${closingLocationSummary}" },
    { type: "UserRegistered", module: "Portal", id: null, seen: false, userIds: [], data: null, backGroundColor: "#ece2ec", fontStyle: 'oblique', message: "${userName} has registered on TTD for collaboration on transaction ${transactionNumber}" },
    { type: "calendarTaskAssigned", module: "Huddle", id: null, seen: false, userIds: [], data: null, backGroundColor: "#ece2ec", fontStyle: 'oblique', message: "${TaskName} has been assigned to you" },
    { type: "calendarTaskSubmit", module: "Huddle", id: null, seen: false, userIds: [], data: null, backGroundColor: "#ece2ec", fontStyle: 'oblique', message: "${userName} has completed the ${taskName} task" },
]

