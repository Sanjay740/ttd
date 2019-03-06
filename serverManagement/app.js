const path = require("path");
const express = require("express");
require('../crons/notification');
require('../crons/conversation');
require('../notifications/redisNotificationChannels');
const bodyParser = require("body-parser");
const app = express();
//const routes = require("../routes/routes");
const adminRoutes = require("../routes/adminRoutes");
const authenticationRoutes = require("../routes/authenticationRoutes");
const huddleConfigRoutes = require("../routes/huddleConfigRoutes");
const huddleTransactionRoutes = require("../routes/huddleTransactionRoutes");
const netSheetRoutes = require("../routes/netSheetRoutes");
const productRoutes = require("../routes/productRoutes");
const portalRoutes = require("../routes/portalRoutes");
const requestedServicesRoutes = require("../routes/requestedServicesRoutes");
const userRoutes = require("../routes/userRoutes");
let huddleRoutes = require("../routes/huddleRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*"); // allow request from all origin
  response.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  response.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization, subdomain"
  );
  next();
});

app.use("/admin", adminRoutes);
app.use("/authentication", authenticationRoutes);
app.use("/netSheet", netSheetRoutes);
app.use("/requestedServices", requestedServicesRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/portal", portalRoutes);
app.use("/portal/config", huddleConfigRoutes);
app.use("/portal/transaction", huddleTransactionRoutes);
app.use("/portal/huddle", huddleRoutes);

app.use("/dist", express.static(path.resolve(__dirname, "./dist")));

const port = process.env.port || 3000;
app.set("port", port);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

app.set("tokenExpirationTime", 7200);
app.set("superAdminEmail", "tiletransactiondealer@gmail.com");

module.exports = app;
