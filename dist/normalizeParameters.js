'use strict';

/**
 * eBay have different field names for their standard parameters for every api
 * This hash table is for looking up the proper field names for each api
 */

module.exports = {
  finding: {
    devKey: 'SECURITY-APPNAME',
    serviceVersion: 'SERVICE-VERSION',
    responseFormat: 'RESPONSE-DATA-FORMAT',
    operation: 'OPERATION-NAME'
  },
  shopping: {
    devKey: 'appid',
    operation: 'callname',
    serviceVersion: 'version',
    responseFormat: 'responseencoding'
  }
};
//# sourceMappingURL=normalizeParameters.js.map
