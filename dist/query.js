'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _requestPromise = require('request-promise');var _requestPromise2 = _interopRequireDefault(_requestPromise);
var _moment = require('moment');var _moment2 = _interopRequireDefault(_moment);
var _qs = require('qs');var _qs2 = _interopRequireDefault(_qs);
var _chai = require('chai');
var _lodash = require('lodash');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 

Query = function () {
  function Query(endpoint, options) {(0, _classCallCheck3.default)(this, Query);
    this._endpoint = endpoint;
    this._options = (0, _lodash.cloneDeep)(options);
    this._options.itemFilter = (0, _lodash.isEmpty)(this._options.itemFilter) ? [] : (0, _lodash.castArray)(this._options.itemFilter);}(0, _createClass3.default)(Query, [{ key: 'setPage', value: function setPage(


    page) {
      (0, _chai.expect)(page, 'pages').to.be.within(1, 100);

      (0, _lodash.set)(this._options, 'paginationInput.pageNumber', page);

      return this;} }, { key: 'setEntriesPerPage', value: function setEntriesPerPage(


    entries) {
      (0, _chai.expect)(entries, 'entries').to.be.within(1, 100);

      (0, _lodash.set)(this._options, 'paginationInput.entriesPerPage', entries);

      return this;} }, { key: 'setFilter', value: function setFilter(


    name, value) {
      var currentValue = this.getFilter(name);

      currentValue ? 
      currentValue['value'] = value : 
      this._options.itemFilter.push({ name: name, value: value });

      return this;} }, { key: 'getFilter', value: function getFilter(


    name) {
      return (0, _lodash.find)(this._options.itemFilter, { name: name });} }, { key: 'setEndTimeTo', value: function setEndTimeTo(


    time) {
      this.setFilter('EndTimeTo', time.toISOString ? time.toISOString() : time);

      return this;} }, { key: 'setEndTimeFrom', value: function setEndTimeFrom(


    time) {
      this.setFilter('EndTimeFrom', time.toISOString ? time.toISOString() : time);

      return this;}


    /*
     Splits query by making new queries with smaller time blocks
     Used to overcome eBay 10000 entry return limit
     */ }, { key: 'split', value: function split(
    parts) {var _this = this;
      var endTimeFrom = (0, _lodash.get)(this.getFilter('EndTimeFrom'), 'value'), 
      endTimeTo = (0, _lodash.get)(this.getFilter('EndTimeTo'), 'value');

      (0, _chai.expect)(endTimeFrom, 'EndTimeFrom').to.exists;
      (0, _chai.expect)(endTimeTo, 'EndTimeTo').to.exists;

      var chunks = (0, _lodash.range)(0, parts);
      var chunkSize = (0, _moment2.default)(endTimeTo).diff(endTimeFrom) / parts;

      return chunks.map(function (n) {
        var start = (0, _moment2.default)(endTimeFrom).add(n * chunkSize, 'ms'), 
        end = (0, _moment2.default)(start).add(chunkSize, 'ms');

        return new Query(_this._endpoint, _this._options).setEndTimeFrom(start).
        setEndTimeTo(end);});} }, { key: 'call', value: function call() 



    {
      var queryString = _qs2.default.stringify(this._options, { delimiter: '&' });

      return (0, _requestPromise2.default)(this._endpoint + '?' + queryString, { json: true });} }]);return Query;}();exports.default = 




Query;
//# sourceMappingURL=query.js.map