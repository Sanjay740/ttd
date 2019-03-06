var config = require("../config/config")
var braintree = require("braintree");

let gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: config.brainTree.merchantId,
  publicKey: config.brainTree.publicKey,
  privateKey: config.brainTree.privateKey
});

module.exports.generateToken = async function () {
  try {
    // Generate client token
    let tokenObj = await gateway.clientToken.generate();
    return tokenObj;
  } catch (error) {
    throw error;
  }
}

module.exports.makepayment = async function (amount, nonceFromTheClient) {
  try {
    let sale = await gateway.transaction.sale({ amount: parseInt(amount), paymentMethodNonce: nonceFromTheClient, options: { submitForSettlement: true } });
    return sale;
  } catch (error) {
    console.log(error);

    throw error;
  }
}