'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require('babel-runtime/helpers/createClass');var _createClass3 = _interopRequireDefault(_createClass2);var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);
var _chai = require('chai');
var _query = require('./query');var _query2 = _interopRequireDefault(_query);
var _util = require('./util');var _util2 = _interopRequireDefault(_util);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var MAX_ENTRIES_PER_REQUEST = 10000;
var MAX_ENTRIES_PER_PAGE = 100;var 

Request = function () {
  function Request(endpoint, options) {(0, _classCallCheck3.default)(this, Request);
    this._createQuery = function () {return new _query2.default(endpoint, options);};}(0, _createClass3.default)(Request, [{ key: 'getEntryCount', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var 


        query = arguments.length <= 0 || arguments[0] === undefined ? this._createQuery : arguments[0];var _ref, _ref2, 
        totalEntries;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return query().setEntriesPerPage(1).
                call().
                then(function (result) {return _util2.default.pickDeep(result, 'totalEntries');});case 2:_ref = _context.sent;_ref2 = (0, _slicedToArray3.default)(_ref, 1);totalEntries = _ref2[0];return _context.abrupt('return', 

                totalEntries);case 6:case 'end':return _context.stop();}}}, _callee, this);}));function getEntryCount(_x) {return ref.apply(this, arguments);}return getEntryCount;}()


    // Fetches all entries from query; Queries that are larger than eBay return limit will be split into smaller queries
  }, { key: 'getAllEntries', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {var _this = this;var consume = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];var query = arguments.length <= 1 || arguments[1] === undefined ? this._createQuery : arguments[1];var 
        totalEntries, 
        chunks, 
        pages, 







        queries, 


        results;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this.getEntryCount(query);case 2:totalEntries = _context2.sent;chunks = Math.ceil(totalEntries / MAX_ENTRIES_PER_REQUEST);pages = Math.ceil(totalEntries / MAX_ENTRIES_PER_PAGE);if (!(totalEntries <= MAX_ENTRIES_PER_REQUEST)) {_context2.next = 9;break;}return _context2.abrupt('return', this.getPages(1, pages, query, consume));case 9:queries = query().split(chunks).map(function (q) {return _this.getAllEntries(false, function () {return q;});});_context2.t0 = _util2.default;_context2.next = 13;return _bluebird2.default.all(queries);case 13:_context2.t1 = _context2.sent;results = _context2.t0.flatten.call(_context2.t0, _context2.t1);return _context2.abrupt('return', 

                consume ? _bluebird2.default.all(results) : results);case 16:case 'end':return _context2.stop();}}}, _callee2, this);}));function getAllEntries(_x3, _x4) {return ref.apply(this, arguments);}return getAllEntries;}()



    // Fetches all pages (limited to 100) return from query
  }, { key: 'getAllPages', value: function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {var consume = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];var 
        totalEntries, 
        totalPages;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this.getEntryCount();case 2:totalEntries = _context3.sent;totalPages = Math.ceil(totalEntries / MAX_ENTRIES_PER_PAGE);return _context3.abrupt('return', 

                this.getPages(1, totalPages <= 100 ? totalPages : 100, consume));case 5:case 'end':return _context3.stop();}}}, _callee3, this);}));function getAllPages(_x7) {return ref.apply(this, arguments);}return getAllPages;}() }, { key: 'getPages', value: function getPages() 


    {
      var from = void 0, to = void 0, createQuery = this._createQuery, consume = true;

      _util2.default.each(arguments, function (v) {
        if (_util2.default.isNumber(v)) v > from ? to = v : (to = from, from = v);
        if (_util2.default.isBoolean(v)) consume = v;
        if (_util2.default.isFunction(v)) createQuery = v;});


      (0, _chai.expect)(to, 'Page to').to.exist;
      (0, _chai.expect)(from, 'Page from').to.exist;

      var pages = _util2.default.range(from, to + 1).
      map(function (p) {return createQuery().setPage(p).call();});

      return consume ? _bluebird2.default.all(pages) : pages;} }, { key: 'then', value: function then(


    dest) {
      return this._createQuery().
      call().
      then(dest);} }, { key: 'pipe', value: function pipe(


    dest) {
      return this._createQuery().
      call().
      pipe(dest);} }, { key: 'on', value: function on(


    event, handler) {
      return this._createQuery().
      call().
      on(event, handler);} }]);return Request;}();



module.exports = Request;
//# sourceMappingURL=request.js.map