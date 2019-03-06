/* import models */
const ConfigurableItems = require("../models/client/netsheet/configurableItems");

function setConfigurableItems(subdomain) {
  return new Promise((resolve, reject) => {
    let configurableData = {};
    ConfigurableItems.getModel(subdomain)
      .find()
      .exec((error, result) => {
        if (error) {
          reject(error);
        } else {
          for (let i = 0; i < result.length; i++) {
            const element = result[i];
            configurableData[element.name.replace(/ +/g, "")] = element.value;
          }
          resolve(configurableData);
        }
      });
  });
}

module.exports = setConfigurableItems;
