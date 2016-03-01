import {assert} from 'chai';
import sinon from 'sinon';
import Query from '../dist/query';
import mockery from 'mockery';
import _ from '../dist/util';

const getFilter      = (q, name) => _.get(q.getFilter(name), 'value');
const getEndTimeFrom = q => getFilter(q, 'EndTimeFrom');
const getEndTimeTo   = q => getFilter(q, 'EndTimeTo');

describe('Query', () => {
  it('Interface', () => {
    const query = new Query('', {});

    assert.property(query, 'setPage');
    assert.property(query, 'setEntriesPerPage');
    assert.property(query, 'setFilter');
    assert.property(query, 'setEndTimeTo');
    assert.property(query, 'setEndTimeFrom');
  });

  it('Set filter', () => {
    const query = new Query('', {});

    const name  = 'seller';
    const value = 'bestbuy';

    query.setFilter(name, value);

    assert.include(query._options.itemFilter, {name, value});
  });

  it('Set time', () => {
    const query = new Query('', {});

    const endTimeFrom = '01-05-2015';
    query.setEndTimeFrom(endTimeFrom);

    assert.include(query._options.itemFilter, {name: 'EndTimeFrom', value: endTimeFrom});

    const endTimeTo = '01-08-2015';
    query.setEndTimeTo(endTimeTo);

    assert.include(query._options.itemFilter, {name: 'EndTimeTo', value: endTimeTo});
  });

  it('Set pagination', () => {
    const query = new Query('', {});

    const entries = 10;
    query.setEntriesPerPage(entries);

    assert.equal(query._options.paginationInput.entriesPerPage, entries);

    const page = 20;
    query.setPage(page);

    assert.equal(query._options.paginationInput.pageNumber, page);
  });
});