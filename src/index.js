'use strict';
const apiMap = require('./apiMap');
const {endPoints, serviceVersions} = require('./defaults');
const normalizeParameters = require('./normalizeParameters');
const request = require('request-promise');
const qs = require('qs');
const _ = require('lodash');

class Ebay {
  constructor({devKey, responseFormat, serviceVersion, sandbox}) {
    if (!devKey) throw new Error('devKey not provided');
    if (responseFormat && !responseFormat.match(/json|xml/i)) throw new Error('Response format must be xml or json');

    this._endPoints = endPoints[sandbox ? 'sandbox' : 'production'];

    // Generate methods for all API
    const api = _.reduce(apiMap, (prev, cur) => { return prev.concat(_.keys(cur)); }, []);

    api.forEach(method => {
      let service = _.findKey(apiMap, method);
      this[method] = new Api(method, this._endPoints[service], {devKey, responseFormat, serviceVersion});
    });
  }
}

// Class used for all generated api methods
class Api {
  constructor(api, endpoint, {devKey, serviceVersion, responseFormat}) {
    this._api = api;
    this._service = _.findKey(apiMap, this._api);
    this._field = normalizeParameters[this._service];
    this._endPoint = endpoint;
    this._credentials = {
      [this._field.devKey]: devKey,
      [this._field.serviceVersion]: _.get(serviceVersion, this._service) || serviceVersions[this._service],
      [this._field.responseFormat]: responseFormat || 'JSON'
    };
  }

  call(options) {
    // using modified qs here to encode url because of ebay's unconventional api...
    const operation = {[this._field.operation]: this._api};
    const query = normalizeQuery(options, this._service + '.' + this._api);
    const uri = this._endPoint + '?' + qs.stringify(_.extend(operation, this._credentials, query), {delimiter: '&'});

    return request(uri);
  }
}

// Validates query and appends @ to detected attributes fields
function normalizeQuery(query, path) {
  if(!_.isPlainObject(query)) throw new TypeError('Query must be an object literal');

  return _.transform(query, (accumulator, value, key) => {
    const list = _.get(apiMap, path);
    const listValue = list[key] || list;

    // Validations
    if (!value) throw new Error(key + ' argument is empty');
    if (!list[key]) throw new Error('Invalid argument: ' + key);

    // Add @ to attributes
    const prefix = (listValue === 'attribute') ? ['@' + key] : key;

    if (_.isArray(value)) return accumulator[prefix] = value;

    // Recursively inspect all elements in object
    if (_.isPlainObject(value) && _.isPlainObject(listValue)){
      return accumulator[prefix] = normalizeQuery(value, path + '.' + key);
    }

    return accumulator[prefix] = value;
  });
}

module.exports = {
  Ebay,
  Api,
  normalizeQuery
};
