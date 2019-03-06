const process = require("process");

process
  .on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at:", reason.stack || reason);

    // TODO: send an email to support.titletransactiondealer.com with the reason of rejection
  })
  .on("uncaughtException", error => {
    console.log("uncaught Exception at:", error);
    // TODO: send an email to support.titletransactiondealer.com with reason of exception
  });
