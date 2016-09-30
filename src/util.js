import _ from 'lodash';

/*
 * Picks key/value pairs from nested objects
 * @collection : The source object
 * @predicate : An array of keys to extract from the collection
 * @returns {object}
 */

function pickDeep(collection, predicate) {
  if (!_.isArray(predicate)) predicate = [predicate];

  var multiArg = predicate.length > 1;

  return _.reduce(collection, function(result, val, key) {
    var included = {};

    if (_.indexOf(predicate, key) !== -1) {
      multiArg
        ? included[key] = val
        : included = val;
    } else if (_.isObject(val)) {
      included = pickDeep(val, predicate);
    }

    if (!_.isEmpty(included)) {
      result = multiArg
        ? _.extend(result, included)
        : included;
    }

    return result;
  }, multiArg ? {} : '');
}

function deepMerge(result, ...sources) {
  return _.mergeWith(result, ...sources, arrayMerger);

  function arrayMerger(objValue, srcValue) {
    if (_.isArray(objValue)) return objValue.concat(srcValue);
  }
}

_.mixin({pickDeep, deepMerge});

module.exports = _;