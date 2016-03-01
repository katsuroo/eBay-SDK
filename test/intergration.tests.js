import {assert} from 'chai';
import sinon from 'sinon';
import Ebay from '../dist/index';

describe('Integration tests', () => {
  const options = {
    devKey: 'devdummy-24f2-47f4-a685-25d207cf23fe',
    responseFormat: 'JSON',
    serviceVersion: '1.13.0',
    sandbox: true
  };

  const ebay = new Ebay(options);

  it('Finding API', function(done) {
    this.timeout(10000);

    const query = {keywords: 'nexus player'};

    ebay.findCompletedItems.call(query).then( d => {
      assert.property(d, 'findCompletedItemsResponse');
      done();
    });
  });

  it('Shopping API', function(done) {
    this.timeout(10000);

    const query = {CategoryID: -1};

    ebay.getCategoryInfo.call(query).then(d => {
      assert.property(d, 'CategoryArray');
      done();
    });
  })
});
