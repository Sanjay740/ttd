const mongoose = require("mongoose")
mongoose.Promise = global.Promise

console.log("just before!")
const dbConnectionString = "mongodb://localhost:27017/TitleTransactionDealer"
mongoose.connect(dbConnectionString)