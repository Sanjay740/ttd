let mongoose = require("mongoose");

module.exports.connect = function(database) {
  database = !!database ? database : "TitleTransactionDealer";

  let dbUri = `mongodb://localhost:27017/${database}`;
  // console.info(`Connnected to : ${database}`);
  return mongoose.createConnection(dbUri, {
    useNewUrlParser: true,
    poolSize: 20
  });
};
