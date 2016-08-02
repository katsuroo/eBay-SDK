'use strict';module.exports = {
  // Default endpoints
  endpoints: {
    production: {
      finding: 'http://svcs.ebay.com/services/search/FindingService/v1',
      shopping: 'http://open.api.ebay.com/shopping' },

    sandbox: {
      finding: 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1',
      shopping: 'http://open.api.sandbox.ebay.com/shopping' } },



  // Default service versions for each api
  serviceVersions: {
    finding: '1.13.0',
    shopping: '949' },


  /**
                        * eBay have different field names for their standard parameters for every api
                        * This is for looking up the proper field names for each api
                        */
  fieldNames: {
    finding: {
      devKey: 'SECURITY-APPNAME',
      serviceVersion: 'SERVICE-VERSION',
      responseFormat: 'RESPONSE-DATA-FORMAT',
      operation: 'OPERATION-NAME' },

    shopping: {
      devKey: 'appid',
      operation: 'callname',
      serviceVersion: 'version',
      responseFormat: 'responseencoding' } } };
//# sourceMappingURL=constants.js.map