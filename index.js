'use strict';
var request = require('request-promise'),
    _ = require('lodash'),
    validationList = require('./validation.list.js');

var App = function(params){
  // Checks initialization parameters
  this.configValidations(params);

  this.endpoints ={
      production:{
        finding: _.has(params, 'endpoints.production.finding')
            ? params.endpoints.production.finding
            : 'http://svcs.ebay.com/services/search/FindingService/v1'
      },
      sandbox:{
        finding: _.has(params, 'endpoints.sandbox.finding')
            ? params.endpoints.sandbox.finding
            : 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1'
      }
    };

  this.config = {
    endpoints: (params.sandbox === true ? this.endpoints.sandbox : this.endpoints.production),
    credentials:{
      'SECURITY-APPNAME': params['SECURITY-APPNAME'] || null,
      'SERVICE-VERSION': params['SERVICE-VERSION'] || '1.13.0',
      'RESPONSE-DATA-FORMAT': params['RESPONSE-DATA-FORMAT'] || 'JSON'
    }
  };
  
  this.requestConfig = params['request'] || null;
};

App.prototype = {
  // Finding API
  finding: function finding (call, option, reqOptions) {

    this.callValidation(call, option);

    var url = this.config.endpoints.finding + this.buildQuery(call, option);
    
    // Configuration for request call
    var customOptions = reqOptions || this.requestConfig;
    var defaultOptions = { json: true, uri: url };
    
    var requestOption = customOptions ? _.merge(defaultOptions, customOptions) : defaultOptions; 

    return request(requestOption);
  },

  // Validates passed in configuration parameters upon initialization
  configValidations: function configValidations(params) {
    var appName = params['SECURITY-APPNAME'];
    var responseFormat = params['RESPONSE-DATA-FORMAT'];

    if (_.isEmpty(params)) {throw new Error('No parameters defined')}

    //SECURITY-APPNAME validation
    if (!appName) {
      throw new Error('SECURITY-APPNAME must be defined');
    }
    if (typeof appName !== 'string') {
      throw new Error('SECURITY-APPNAME must be a string');
    }
    if (appName.length !== 36) {
      throw new Error('SECURITY-APPNAME length must be 36 characters long');
    }

    //RESPONSE-DATA-FORMAT validation
    if (responseFormat){
      if (responseFormat.search(/(?:json|xml)/i)) {
        throw new Error('RESPONSE-DATA-FORMAT must be xml or json');
      }
    }
  },

  // Compares the passed in api call parameters to the validation list
  callValidation: function callValidation (call, option) {
    // Check call API name
    if(!validationList[call]) { throw new Error('Invalid call') }

    // Check call options by comparing to the API list
    _.each(option, function(val, key) {
      if (validationList[call].indexOf(key) === -1) {
        throw new Error('Invalid call option, check spelling')
      }
    });
  },

  // Builds query from ebay credentials and call parameters
  buildQuery: function buildQuery (call, option) {
    var operation = '?OPERATION-NAME=' + call;
    var credentials = _.map(this.config.credentials, function(v, k) { return '&' + k + '=' + v }).join('');
    var options = _.map(option, function(v, k) {
      // Add @ to options that contain attributes
      k = k.replace(/\./i, '.@');
      
      return '&' + k + '=' + v
    }).join('');

    return operation + credentials + options;
  }
};

module.exports = App;
