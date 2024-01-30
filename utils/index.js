const moment = require('moment');
const _ = require('lodash');
const crypto = require('crypto');
const sha256 = require('js-sha256');

const utils = {
  /**
   * @description YYYY-MM-DD HH:mm:ss formatted
   * @returns {string}
   */
  now() {
    let today = moment();
    return today.format('"YYYY-MM-DD HH:mm:ss"').toString();
  },

  /**
   * Check if is number, both in string format ('5') or number format (5). Return false if is NaN, empty, null, undefined...
   * @param {any} param
   */
  isValidNumber(param) {
    if (
      ((!_.isString(param) || _.isEmpty(param)) && !_.isNumber(param)) ||
      _.isNull(param) ||
      _.isUndefined(param)
    ) {
      return false;
    }
    return !isNaN(param);
  },

  isJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },
  /**
   *
   * @param {number=} size default: `20`
   * @returns
   */
  generateRandomStr(size = 32) {
    return crypto.randomBytes(size).toString('hex');
  },

  // sha256
  sha256: (text) => {
    return sha256(text);
  },

  // Check object empty
  isObjectEmpty: (obj) => {
    return utils.isObjectNull(obj) || (Object.keys(obj).length === 0 && obj.constructor === Object);
  },

  // Check object null|undefine
  isObjectNull: (obj) => {
    return obj === null || obj === undefined || obj === 'NULL' || obj === 'null';
  },

  // remove exist value in aray
  removeExist: (arr, value) => {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  },
};

module.exports = utils;
