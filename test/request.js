import {assert} from 'chai';
import sinon from 'sinon';
import MemoryStream from 'memorystream';
import {EbayRequest} from '../dist/request';
import _ from '../dist/util';

// Mock server setup
const mockHost   = 'http://ebay.test';
const mockPath   = '/';
const mockData   = require('./mocks/data.js');
const mockServer = require('./mocks/server.js');

mockServer(mockHost, mockPath, mockData);

describe('EbayRequest', function () {
  this.timeout(5000);
  
  const generateRequest = (q) => (new EbayRequest(mockHost + mockPath, q || {keywords: 'iphone'}));
  
  it('Return promise interface', () => {
    const request = generateRequest();
    
    const result = request.catch(d => {
    });
    
    assert.property(result, 'then');
  });
  
  it('Return result in promise', done => {
    const request = generateRequest();
    
    request.then(d => done());
  });
  
  it('Return result in stream', done => {
    const request = generateRequest();
    const stream  = new MemoryStream(null, {readable: false});
    
    request.pipe(stream);
    
    stream.on('finish', () => {
      const result = stream.toString();
      
      assert.equal(result, JSON.stringify(mockData));
      
      done()
    })
  });
  
  it('Http calls should not be made before consumption', done => {
    const host   = 'http://www.google.com';
    const server = mockServer(host, '/', {test: 'test'});
    
    new EbayRequest(host + '/', {keywords: 'empty'});
    
    setTimeout(() => {
      assert.equal(server.isDone(), false);
      done();
    }, 500);
  });
  
  it('Get page range', done => {
    const query   = {keywords: 'titan'};
    const request = generateRequest(query);
    const from    = 2;
    const to      = 5;
    
    request.getPages(from, to).then(d => {
      assert.equal(d.length, 4);
      
      _.each(d, v => assert.equal(JSON.stringify(v), JSON.stringify(mockData)));
      
      done();
    });
  });
  
  it('Return results for all pages', done => {
    const request = generateRequest();
    
    request.getAllPages().then(d => {
      assert.equal(d.length, 100);
      
      _.each(d, v => assert.equal(JSON.stringify(v), JSON.stringify(mockData)));
      
      done();
    });
  });
  
  it('Return array of raw request objects for all pages', done => {
    const request         = generateRequest();
    const isRequestObject = v => (v.then && v.pipe && v.on);
    
    request.getAllPages(false).then(d => {
      assert.equal(d.length, 100);
      
      _.each(d, v => assert.isOk(isRequestObject(v)));
      
      done();
    });
  });
  
  it('Return entry count', done => {
    const request         = generateRequest();
    const getTotalEntries = request.getEntryCount();
    
    getTotalEntries.then(totalEntries => {
      assert.equal(totalEntries, 20000);
      done();
    });
  });
  
  it('Get All Entries', done => {
    const itemFilter = [
      {name: 'EndTimeFrom', value: '2015-01-01T00:00:00.000Z'},
      {name: 'EndTimeTo', value: '2015-01-03T00:00:00.000Z'}
    ];
    
    const request = generateRequest({itemFilter});
    
    const getPagesSpy      = sinon.spy(request, 'getPages');
    const entryCountStub   = sinon.stub(request, 'getEntryCount');
    const getAllEntriesSpy = sinon.spy(request, 'getAllEntries');
    
    entryCountStub.onFirstCall().returns(20000);
    entryCountStub.onSecondCall().returns(500);
    entryCountStub.onThirdCall().returns(800);
    
    request.getAllEntries(true).then(() => {
      assert.equal(getAllEntriesSpy.calledThrice, true);
      assert.equal(entryCountStub.calledThrice, true);
      assert.equal(getPagesSpy.firstCall.calledWith(1, 5), true);
      assert.equal(getPagesSpy.secondCall.calledWith(1, 8), true);
      
      done();
    });
  });
});