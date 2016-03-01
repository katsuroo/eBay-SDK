import {assert} from 'chai';
import sinon from 'sinon';
import Ebay from '../dist/index';
import {keys, each, lowerFirst, flatMap} from '../dist/util';
import apiList from '../dist/definitions/index';

//const {keys, each, lowerFirst, flatMap} = _;

describe('eBay', function() {
  it('Validator', () => {
    const noDevKey = () => (new Ebay());
    const invalidResponseFormat = () => (new Ebay({responseFormat: 'binary'}));

    assert.throws(noDevKey);
    assert.throws(invalidResponseFormat);

    const shouldPass = () => (new Ebay({devKey: 123}));

    assert.doesNotThrow(shouldPass);
  });

  it('Initialize all api', () => {
    const ebay = new Ebay({devKey: 123});
    const index = flatMap(apiList, chunk => (keys(chunk)));

    each(index, v => assert.property(ebay, lowerFirst(v)));
  })
});
