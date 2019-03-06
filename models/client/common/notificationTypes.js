const NOTIFICATION_TYPES = [
    { type: "NetSheetGenerated", module: "NetSheet", users: [] },
    { type: "ServiceRequested", module: "RequestedService", users: [] },
    { type: "ServiceRequestProcessed", module: "RequestedService", users: [] },
]

module.exports.notificationTypeJson = NOTIFICATION_TYPES;