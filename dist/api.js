'use strict';var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _request = require('./request');var _request2 = _interopRequireDefault(_request);
var _chai = require('chai');
var _util = require('./util');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

Api = function () {
  function Api(endpoint, apiList, requiredFields) {(0, _classCallCheck3.default)(this, Api);
    this._endpoint = endpoint;
    this._apiList = apiList;
    this._requiredFields = requiredFields;}(0, _createClass3.default)(Api, [{ key: 'call', value: function call(


    q) {
      var query = (0, _util.extend)({}, this._requiredFields, normalizeQuery(q, this._apiList));

      return new _request2.default(this._endpoint, query);} }]);return Api;}();



/** Validates query and prepends @ to attributes fields */
function normalizeQuery(query, apiList) {

  return (0, _util.transform)(query, function (result, value, field) {
    var matchedField = apiList[field];

    (0, _chai.expect)(value, field).to.exist.and.not.empty;
    (0, _chai.expect)(matchedField, 'Field ' + field).exist.and.not.empty;

    // appends @ to attribute fields
    var normalizedField = matchedField === 'attribute' ? ['@' + field] : field;

    if ((0, _util.isPlainObject)(value) && (0, _util.isPlainObject)(matchedField)) {
      return result[normalizedField] = normalizeQuery(value, matchedField);}


    return result[normalizedField] = value;});}



module.exports = { Api: Api, normalizeQuery: normalizeQuery };
//# sourceMappingURL=api.js.map