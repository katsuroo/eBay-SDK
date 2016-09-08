import promise from 'bluebird';
import {expect} from 'chai';
import Query from './query';
import _ from './util';

const MAX_ENTRIES_PER_REQUEST = 10000;
const MAX_ENTRIES_PER_PAGE    = 100;

class Request {
  constructor(endpoint, options) {
    this._createQuery = () => new Query(endpoint, options);
  }
  
  async getEntryCount(query = this._createQuery) {
    const [totalEntries] = await query().setEntriesPerPage(1)
                                        .call()
                                        .then(result => _.pickDeep(result, 'totalEntries'))
                                        .catch(err => console.log(err));
    
    return totalEntries;
  }
  
  // Fetches all entries from query; Queries that are larger than eBay return limit will be split into smaller queries
  async getAllEntries(consume = true, query = this._createQuery) {
    const totalEntries = await this.getEntryCount(query);
    const chunks       = Math.ceil(totalEntries / MAX_ENTRIES_PER_REQUEST);
    const pages        = Math.ceil(totalEntries / MAX_ENTRIES_PER_PAGE);
    
    if (totalEntries <= 0) return [];
    
    if (totalEntries <= MAX_ENTRIES_PER_REQUEST) {
      
      return this.getPages(1, pages, query, consume)
      
    } else {
      
      const queryChunks = query().split(chunks)
                                 .map(q => this.getAllEntries(false, q));
      
      const results = _.flatten(await promise.all(queryChunks));
      
      return consume ? promise.all(results) : results;
    }
  }
  
  // Fetches all pages (limited to 100) return from query
  async getAllPages(consume = true) {
    const totalEntries = await this.getEntryCount();
    const totalPages   = Math.ceil(totalEntries / MAX_ENTRIES_PER_PAGE);
    
    return this.getPages(1, totalPages <= 100 ? totalPages : 100, consume);
  }
  
  getPages() {
    let from, to, createQuery = this._createQuery, consume = true;
    
    _.each(arguments, v => {
      if (_.isNumber(v)) v > from ? (to = v) : (to = from, from = v);
      if (_.isBoolean(v)) consume = v;
      if (_.isFunction(v)) createQuery = v;
    });
    
    expect(to, 'Page to').to.exist;
    expect(from, 'Page from').to.exist;
    
    const pages = _.range(from, to + 1)
                   .map(p => createQuery().setPage(p).call());
    
    return consume ? promise.all(pages) : pages;
  }
  
  then(dest) {
    return this._createQuery()
               .call()
               .then(dest);
  }
  
  pipe(dest) {
    return this._createQuery()
               .call()
               .pipe(dest);
  }
  
  on(event, handler) {
    return this._createQuery()
               .call()
               .on(event, handler);
  }
  
  catch(handler) {
    return this._createQuery()
               .call()
               .catch(handler);
  }
}

module.exports = Request;
