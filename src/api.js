import Request from './request';
import {expect} from 'chai';
import {extend, transform, isPlainObject} from './util';

class Api {
  constructor(endpoint, apiList, requiredFields) {
    
    return query => {
      const options = extend({}, requiredFields, normalizeQuery(query, apiList));
      return new Request(endpoint, options);
    };
    
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
