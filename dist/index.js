'use strict';var _defineProperty2 = require('babel-runtime/helpers/defineProperty');var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _api = require('./api');
var _index = require('./definitions/index.js');var _index2 = _interopRequireDefault(_index);
var _constants = require('./constants');
var _chai = require('chai');
var _util = require('./util');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

Ebay =
function Ebay(_ref) {var _this = this;var devKey = _ref.devKey;var _ref$responseFormat = _ref.responseFormat;var responseFormat = _ref$responseFormat === undefined ? 'JSON' : _ref$responseFormat;var serviceVersion = _ref.serviceVersion;var sandbox = _ref.sandbox;(0, _classCallCheck3.default)(this, Ebay);
  (0, _chai.expect)(devKey, 'devKey').to.exist;
  (0, _chai.expect)(responseFormat, 'responseFormat').to.match(/json|xml/i);

  var endpoint = _constants.endpoints[sandbox ? 'sandbox' : 'production'];

  (0, _util.each)(_index2.default, function (api, service) {
    var operationList = (0, _util.keys)(api);

    (0, _util.each)(operationList, function (operation) {var _requiredFields;
      var field = _constants.fieldNames[service];
      var requiredFields = (_requiredFields = {}, (0, _defineProperty3.default)(_requiredFields,
      field.operation, operation), (0, _defineProperty3.default)(_requiredFields,
      field.devKey, devKey), (0, _defineProperty3.default)(_requiredFields,
      field.serviceVersion, (0, _util.get)(serviceVersion, service) || _constants.serviceVersions[service]), (0, _defineProperty3.default)(_requiredFields,
      field.responseFormat, responseFormat), _requiredFields);


      _this[(0, _util.lowerFirst)(operation)] = new _api.Api(endpoint[service], _index2.default[service][operation], requiredFields);
    });
  });
};


module.exports = Ebay;
//# sourceMappingURL=index.js.map