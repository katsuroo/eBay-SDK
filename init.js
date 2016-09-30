const Ebay = require('./dist/index.js').default;

// Factory function for initializing module
module.exports = function(options) {
  return new Ebay(options);
};
