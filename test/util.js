import {assert} from 'chai';
import _ from '../dist/util';

describe('Pick deep', function() {
  it('Extract fields from nested object', function() {
    const predicate = ['itemId', 'title'];
    const object = {itemId: ['123'], test: [{ title: ['test'] }], dummy: 123};

    const result = _.pickDeep(object, predicate);

    assert.notProperty(result, 'dummy');
    assert.property(result, 'itemId');
    assert.property(result, 'title');
  });
});
