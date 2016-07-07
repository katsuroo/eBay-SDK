import Request from './request';
import {expect} from 'chai';
import {extend, get, transform, isPlainObject} from './util';

class Api {
  constructor(endpoint, apiList, requiredFields) {
    this._endpoint       = endpoint;
    this._apiList        = apiList;
    this._requiredFields = requiredFields;
  }

  call(q) {
    const query = extend({}, this._requiredFields, normalizeQuery(q, this._apiList));

    return new Request(this._endpoint, query);
  }
}

/** Validates query and prepends @ to attributes fields */
function normalizeQuery(query, apiList) {

  return transform(query, (result, value, field) => {
    const matchedField = apiList[field];

    expect(value).to.exist.and.not.empty;
    expect(field).to.exist.and.not.empty;
    expect(matchedField, 'Field ' + field).exist.and.not.empty;

    // appends @ to attribute fields
    const normalizedField = (matchedField === 'attribute') ? ['@' + field] : field;

    if (isPlainObject(value) && isPlainObject(matchedField)) {
      return result[normalizedField] = normalizeQuery(value, matchedField);
    }

    return result[normalizedField] = value;
  });
}

module.exports = {Api, normalizeQuery};
