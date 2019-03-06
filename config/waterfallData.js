let Feature = require("../models/product/feature");
let fs = require("fs");
// Insert all configurable
async function addFeatures() {
  try {
    let FeatureModel = Feature.getModel();
    let count = await FeatureModel.countDocuments({});
    if (count == 0) {
      let data = fs.readFileSync("./seed/feature/feature.json", "utf8");
      let items = JSON.parse(data);
      for (let item of items) {
        let feature = new FeatureModel(item);
        await feature.save();
      }
    }
  } catch (err) {
    console.log("count not create features");
  }
}

module.exports = addFeatures;
