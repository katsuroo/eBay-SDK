var _ = require('lodash');
var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;
var apiMap = require('./src/api');
var ebayModule = require('./src/index');

describe('Query Normalizer', function() {
  var normalize = _.curryRight(ebayModule.normalizeQuery)('finding.findCompletedItems');

  it('Throw error when argument is not an object literal', function() {
    assert.throw(function(){ normalize(123); }, 'Query must be an object literal');
  });

  it('Throw error when empty argument is recieved', function() {
    var nullInput = function() { normalize({keywords: null}) };
    var emptyStringInput = function() {normalize({keywords: ''})};
    var undefinedInput = function() {normalize({keywords: undefined})};

    assert.throw(nullInput, 'keywords argument is empty');
    assert.throw(emptyStringInput, 'keywords argument is empty');
    assert.throw(undefinedInput, 'keywords argument is empty');
  });

  it('Throw error for arguments that are not in the api list', function() {
    var doesNotExist = {random: 123};
    var call = function() {normalize(doesNotExist);};

    assert.throw(call, 'Invalid argument: random');
  });

  it('Add @ to attributes', function() {
    var attribute = {
      productId: {
        type: 'ISBN',
        name: 'Harry Potter'
      }
    };

    assert.deepProperty(normalize(attribute), 'productId.@type');
    assert.deepProperty(normalize(attribute), 'productId.@name');
  });
});

describe('Api class', function() {
  var Api = ebayModule.Api;
  var options = {devKey: 'none', serviceVersion: '1.0', responseFormat: 'JSON'};

  it('public methods', function() {
    var instance = new Api('findCompletedItems', '', options);

    assert.property(instance, 'call');
  });

  it('constructor', function() {
    var api = 'findCompletedItems';
    var endPoint = 'http://www.somewhere.com/v1';
    var instance = new Api(api, endPoint, options);

    assert.propertyVal(instance, '_api', api);
    assert.propertyVal(instance, '_endPoint', endPoint);
    assert.property(instance, '_service');
    assert.property(instance, '_field');
    assert.property(instance, '_credentials');
  });

  it('call methods returns a request object', function() {
    var instance = new Api('findCompletedItems', 'http://www.somewhere.com/v1', options);
    var query = {keywords: 'iphone'};
    var call = instance.call(query);

    assert.property(call, 'pipe');
    assert.property(call, 'then');
  });
});

describe('Ebay class', function() {
  var App = ebayModule.Ebay;
  var options = { devKey: 'random123' };

  it('Generate methods from api list', function() {
    var instance = new App(options);
    var calls = _.keys(_.values(apiMap)[0]);

    _.each(calls, val => {
      assert.property(instance, val);
    });
  });
});

describe('init factory', function() {
  const init = require('./init');

  it('Return App', function() {
    const instance = init({
      devKey: '123'
    });

    assert.ok(instance);
    assert.property(instance, '_endPoints')
  });
});

describe('Integration tests **Internet Required**', function() {
  var options = {
    devKey: 'devdummy-24f2-47f4-a685-25d207cf23fe',
    responseFormat: 'JSON',
    serviceVersion: '1.13.0',
    sandbox: true
  };
  var instance = new ebayModule.Ebay(options);

  it('Finding api', function(done) {
    this.timeout(10000);
    var query = {keywords: 'iphone'};

    instance.findCompletedItems.call(query).then(result => {
      assert.ok(result);
      done();
    }).catch(error => {
      console.log(error);
    });
  });

  it('Shopping api', function(done) {
    this.timeout(10000);
    var query = {CategoryID: -1};

    instance.GetCategoryInfo.call(query).then(result => {
      assert.ok(result);
      done();
    }).catch(error => {
      console.log(error);
    });
  });
});
