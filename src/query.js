import request from 'request-promise';
import moment from 'moment';
import qs from 'qs';
import {expect} from 'chai';
import {cloneDeep, castArray, set, get, find, isEmpty, extend, range} from 'lodash';

class Query {
  constructor(endpoint, options) {
    this._endpoint           = endpoint;
    this._options            = cloneDeep(options);
    this._options.itemFilter = isEmpty(this._options.itemFilter) ? [] : castArray(this._options.itemFilter);
  }

  setPage(page) {
    expect(page, 'pages').to.be.within(1, 100);

    set(this._options, 'paginationInput.pageNumber', page);

    return this;
  }

  setEntriesPerPage(entries) {
    expect(entries, 'entries').to.be.within(1, 100);

    set(this._options, 'paginationInput.entriesPerPage', entries);

    return this;
  }

  setFilter(name, value) {
    const currentValue = this.getFilter(name);

    currentValue
      ? currentValue['value'] = value
      : this._options.itemFilter.push({name, value});

    return this;
  }

  getFilter(name) {
    return find(this._options.itemFilter, {name});
  }

  setEndTimeTo(time) {
    this.setFilter('EndTimeTo', time.toISOString ? time.toISOString() : time);

    return this;
  }

  setEndTimeFrom(time) {
    this.setFilter('EndTimeFrom', time.toISOString ? time.toISOString() : time);

    return this;
  }

  /*
   Splits query by making new queries with smaller time blocks
   Used to overcome eBay 10000 entry return limit
   */
  split(parts) {
    const endTimeFrom = get(this.getFilter('EndTimeFrom'), 'value'),
          endTimeTo   = get(this.getFilter('EndTimeTo'), 'value');

    expect(endTimeFrom, 'EndTimeFrom').to.exists;
    expect(endTimeTo, 'EndTimeTo').to.exists;

    const chunks    = range(0, parts);
    const chunkSize = moment(endTimeTo).diff(endTimeFrom) / parts;

    return chunks.map(n => {
      const start = moment(endTimeFrom).add((n * chunkSize), 'ms'),
            end   = moment(start).add(chunkSize, 'ms');

      return new Query(this._endpoint, this._options).setEndTimeFrom(start)
                                                     .setEndTimeTo(end);
    });
  }

  call() {
    const queryString = qs.stringify(this._options, {delimiter: '&'});

    return request(this._endpoint + '?' + queryString, {json: true});
  }
}


export default Query;
