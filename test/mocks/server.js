const nock = require('nock');

function serverMock(host, path, data, query = true) {
  return nock(host).persist()
                   .get(path)
                   .query(query)
                   .reply(200, JSON.stringify(data));
}

module.exports = serverMock;
