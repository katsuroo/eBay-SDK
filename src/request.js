import promise from 'bluebird';
import Http from 'request-promise';
import {expect} from 'chai';
import Query from './query';
import _ from './util';

const MAX_ENTRIES_PER_REQUEST = 10000;
const MAX_ENTRIES_PER_PAGE    = 100;

/**
 * Wraps request object to delay http calls until request is consumed
 */
export class Request extends Http {}

const requestPrototype = Request.Request.prototype;

const originalInit = requestPrototype.init;

requestPrototype.init = function (options) {
  
  this.init = function () {
    originalInit.call(this, options);
  };
};

['then', 'catch', 'finally', 'pipe', 'once'].forEach(method => {
  const originalMethod = requestPrototype[method];
  
  requestPrototype[method] = function () {
    this.init();
    
    return originalMethod.call(this, ...arguments);
  };
});

export class EbayRequest {
  
  constructor(endpoint, options) {
    
    const request = new Query(endpoint, options).invoke();
    
    request._createQuery  = () => new Query(endpoint, options);
    request.getPages      = getPages;
    request.getAllPages   = getAllPages;
    request.getAllEntries = getAllEntries;
    request.getEntryCount = getEntryCount;
    
    return request;
  }
}

async function getEntryCount(query = this._createQuery) {
  
  try {
    const request = query().setEntriesPerPage(1)
                           .invoke();
    
    const [totalEntries] = await request.then(result => _.pickDeep(result, 'totalEntries'))
                                        .catch(err => console.log(err));
    
    return totalEntries;
  } catch (err) {
    throw new Error(err);
  }
}


async function getAllEntries(consume = true, createQuery = this._createQuery) {
  
  try {
    const totalEntries = await this.getEntryCount(createQuery);
    const chunks       = Math.ceil(totalEntries / MAX_ENTRIES_PER_REQUEST);
    const pages        = Math.ceil(totalEntries / MAX_ENTRIES_PER_PAGE);
    
    if (totalEntries <= 0) return [];
    
    if (totalEntries <= MAX_ENTRIES_PER_REQUEST) {
      
      return this.getPages(1, pages, createQuery, consume);
      
    } else {
      
      const queryChunks = createQuery().split(chunks)
                                       .map(q => this.getAllEntries(false, q));
      
      const results = _.flatten(await promise.all(queryChunks));
      
      return consume ? promise.all(results) : results;
    }
  } catch (err) {
    throw new Error(err);
  }
}


async function getAllPages(consume = true) {
  
  try {
    const totalEntries = await this.getEntryCount();
    const totalPages   = Math.ceil(totalEntries / MAX_ENTRIES_PER_PAGE);
    
    return this.getPages(1, totalPages <= 100 ? totalPages : 100, consume);
  } catch (err) {
    
    throw new Error(err);
  }
}


function getPages() {
  let from, to, createQuery = this._createQuery, consume = true;
  
  _.each(arguments, v => {
    if (_.isNumber(v)) v > from ? (to = v) : (to = from, from = v);
    if (_.isBoolean(v)) consume = v;
    if (_.isFunction(v)) createQuery = v;
  });
  
  expect(to, 'Page to').to.exist;
  expect(from, 'Page from').to.exist;
  
  const pages = _.range(from, to + 1)
                 .map(p => createQuery().setPage(p).invoke());
  
  return consume ? promise.all(pages) : pages;
}