import {assert} from 'chai';
import ebay from '../init';
import {keys, each, lowerFirst, flatMap} from '../dist/util';
import apiList from '../dist/definitions/index';

describe('eBay', function () {
  it('Validator', () => {
    const noDevKey              = () => ebay();
    const invalidResponseFormat = () => ebay({responseFormat: 'binary'});
    
    assert.throws(noDevKey);
    assert.throws(invalidResponseFormat);
    
    const shouldPass = () => ebay({devKey: 123});
    
    assert.doesNotThrow(shouldPass);
  });
  
  it('Initialize all api', () => {
    const instance  = ebay({devKey: 123});
    const index = flatMap(apiList, chunk => (keys(chunk)));
    
    each(index, v => assert.property(instance, lowerFirst(v)));
  })
});
