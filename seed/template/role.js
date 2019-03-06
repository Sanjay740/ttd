// The array written below is for adding two roles to user collection in client database when client
// registers in TTD. User with Admin role will be able to access anything in the application as well as SuperAdmin User.
// actions = All means user can do any operation on the view irrespective of view part.
[
  {
    name: "admin",
    description: "",
    defaultView: "SummaryDashboard",
    views: [
      {
        view: "SummaryDashboard",
        viewParts: [
          {
            name: "TransactionSummary",
            actions: ["All"],
            viewParts: []
          }
        ],
        actions: ["All"]
      }
    ]
  },
  {
    name: "superAdmin",
    description: "",
    defaultView: "SummaryDashboard",
    views: [
      {
        view: "SummaryDashboard",
        viewParts: [
          {
            name: "TransactionSummary",
            actions: ["All"],
            viewParts: []
          }
        ],
        actions: ["All"]
      }
    ]
  }
];
