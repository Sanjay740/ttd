module.exports.b2Config = {
  // ENV : 'developement

  accountId: "5f3b957291df",
  applicationKey: "002807c80636ec4d5b7c652daaa981828ab33e5728",
  bucketId: "95af13eb39b5779269310d1f"

  // ENV : 'testing'

  // accountId: '879c6c3f3079',
  // applicationKey: '0023e1eff2f0b78aba7b78875870b798cc64234c1b',
  // bucketId:'5827e9cc86aca3af63500719'

  // ENV : 'production'

  // accountId: process.env.B2_ACCOUNT_ID,
  // applicationKey: process.env.B2_APPLICATION_KEY
  // bucketId: process.env.B2_BUCKET_ID
};

module.exports.getSubdomainAddress = function(subDomainName, path) {
  // Production
  // const url = `https://${subDomainName}.titletransactiondealer.com/${path}`;

  //UAT
  // const url = `https://${subDomainName}.titletransactiondealer.xyz/${path}`;

  // Local
  const url = `http://${subDomainName}.titletransactiondealer.abc:8080/${path}`;

  // Online
  // const url = `https://${subDomainName}.titletransactiondealer.online/${path}`
  return url;
};

module.exports.jwt = {
  secret: "T1tL3Tr^n5^(T10ND3^L3R",
  session: { session: false }
};

module.exports.TitleTransactionDealer = "TitleTransactionDealer";

module.exports.brainTree = {
  merchantId: "yx3qgzbg9d59c8zx",
  publicKey: "z8n98qw5q58s64ys",
  privateKey: "85e542071e6d92cb14021b28054a32ad"
};
