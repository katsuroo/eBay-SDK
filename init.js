const main = require('./dist/index.js');

// Factory function for initializing module
module.exports = function(options) {
  return new main.App(options);
};
