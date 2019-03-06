const Enums = require('../models/client/netsheet/enumTypes')
const moment = require('moment')
function generateObjectId() {
  let id = "";
  let size = 16;
  var possible = "0123456789abcdef0123456789";
  for (var i = 0; i < size; i++)
    id += possible.charAt(Math.floor(Math.random() * possible.length));

  return id;
}

function findIndex(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

function getEnumPropName(et, id) {
  let name = ''
  for (const key in Enums[et]) {
    if (Enums[et].hasOwnProperty(key)) {
      if (Enums[et][key] === parseInt(id)) {
        name = key;
      }
    }
  }
  name = name.replace(/([a-z])([A-Z])/, "$1 $2")
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function checkDate(value) {
  if (value === undefined || value === null) {
    return ' ';
  } else {
    return moment(new Date(value)).format("MMM DD YYYY")
  }
}

async function getOrderNumber(orderNumber) {
  let month = (new Date()).getMonth();
  if (month < 10) {
    month = String(0) + month;
  }
  let year = (new Date()).getFullYear();
  let prefixToAdd = String(year) + String(month);
  let number = 000001;
  if (orderNumber) {
    let prefix = orderNumber.toString().substring(0, 6);
    if (prefix == prefixToAdd) {
      number = Number.parseInt(orderNumber.toString().substring(6, orderNumber.toString().length)) + 1;
    }
  }
  return prefixToAdd + String(number);
}

function getPropertySummary(property) {
  let summary = "";

  if (property) {
    summary += !property.address1 ? "" : property.address1;
    summary += !property.address2 ? "" : property.address2;
    summary += !property.city ? "" : property.city;
    summary += !property.zip ? "" : property.zip;
    summary += !property.state ? "" : property.state;

  }
  return summary;
}

module.exports = {
  findIndex: findIndex,
  generateObjectId: generateObjectId,
  getEnumPropName: getEnumPropName,
  checkDate: checkDate,
  generateOrderNumber: getOrderNumber,
  getPropertySummary: getPropertySummary

};