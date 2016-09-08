import {assert} from 'chai';
import sinon from 'sinon';
import Ebay from '../dist/index';
import _ from '../dist/util';

describe('Integration tests', function() {
  this.timeout(10000);
  
  const options = {
    devKey        : 'devdummy-24f2-47f4-a685-25d207cf23fe',
    responseFormat: 'JSON',
    serviceVersion: '1.13.0',
    sandbox       : true
  };

  const ebay = new Ebay(options);

  it('Finding API', function (done) {

    const query = {keywords: 'nexus player'};

    ebay.findCompletedItems(query)
        .then(d => {
          assert.property(d, 'findCompletedItemsResponse');
          done();
        });
  });

  it('Shopping API', function (done) {

    const query = {CategoryID: -1};

    ebay.getCategoryInfo(query)
        .then(d => {
          assert.property(d, 'CategoryArray');
          done();
        });
  });
});
