const http = require("http");
require("./serverManagement/globalEventHandler");
const app = require("./serverManagement/app");
require("../server/config/waterfallData")();

// create server
const server = http.createServer(app);

module.exports = server;
