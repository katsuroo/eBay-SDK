module.exports = {
  endPoints: {
    production:{
      finding: 'http://svcs.ebay.com/services/search/FindingService/v1',
      shopping: 'http://open.api.ebay.com/shopping'
    },
    sandbox:{
      finding: 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1',
      shopping: 'http://open.api.sandbox.ebay.com/shopping'
    }
  },
  // Default service versions for each api
  serviceVersions: {
    finding: '1.13.0',
    shopping: '949'
  }
};
