'use strict';var _lodash = require('lodash');var _lodash2 = _interopRequireDefault(_lodash);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/*
                                                                                                                                                                                           * Picks key/value pairs from nested objects
                                                                                                                                                                                           * @collection : The source object
                                                                                                                                                                                           * @predicate : An array of keys to extract from the collection
                                                                                                                                                                                           * @returns {object}
                                                                                                                                                                                           */

function pickDeep(collection, predicate) {
  if (!_lodash2.default.isArray(predicate)) predicate = [predicate];

  var multiArg = predicate.length > 1;

  return _lodash2.default.reduce(collection, function (result, val, key) {
    var included = {};

    if (_lodash2.default.indexOf(predicate, key) !== -1) {
      multiArg ?
      included[key] = val :
      included = val;
    } else if (_lodash2.default.isObject(val)) {
      included = pickDeep(val, predicate);
    }

    if (!_lodash2.default.isEmpty(included)) {
      result = multiArg ?
      _lodash2.default.extend(result, included) :
      included;
    }

    return result;
  }, multiArg ? {} : '');
}

function deepMerge(result) {for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {sources[_key - 1] = arguments[_key];}
  return _lodash2.default.mergeWith.apply(_lodash2.default, [result].concat(sources, [arrayMerger]));

  function arrayMerger(objValue, srcValue) {
    if (_lodash2.default.isArray(objValue)) return objValue.concat(srcValue);
  }
}

_lodash2.default.mixin({ pickDeep: pickDeep, deepMerge: deepMerge });

module.exports = _lodash2.default;

//export default _;
//# sourceMappingURL=util.js.map