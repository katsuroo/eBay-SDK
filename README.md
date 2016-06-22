# eBay SDK


API Support

 * **Finding** (Full)
 * **Shopping** (Full)

## Usage:

```javascript
var config = {devKey: xxxxxxx};
var ebay = require('ebay-sdk')(config);
var query = {keywords: 'iphone'};

ebay
  .findCompletedItems // eBay operation
  .call(query)

  // Promise
  .then(function(result) { /* Do Something */ });

  // Stream
  .pipe(stream);
```

## Setup:

```
require('ebay-sdk')({config})
```

The configuration object takes in the following parameters:

- ***devKey*** (_required_):
ebay developer key


- ***serviceVersion*** (_optional_):
takes in object with api service name as key and service number as value


- ***responseFormat*** (_optional_):
xml or json

## Call:
```
ebay.[api].call({query})
```

Returns a **Request** object

- **api**: All the supported api under the services that are supported, reference ebay api doc for exact names


- **query**: api arguments in key / value pairs

```javascript
var query = {

  // Simple example
  keywords: 'iphone',

  // Complex
  itemFilter: [
    {name: 'Condition', value: ['New', 'Like New']} // Multiple values
    {name: 'ExcludeCategory', value: '132112112'}
  ]

}
```



## Request:
Object returned from an api call. It contains the promise / stream interface to interact with results along with other methods to manipulate the request.

#### then
```
request.then([result handler])
```

Promise interface to interact with  data

#### Pipe
```
request.pipe([stream])
```

Stream interface to interact with  data

#### getAllPages
```
request.getAllPages([raw]).then([result handler])
```


Fetches all pages (up to 100) from query.

_consume_ \<boolean>: When set to false, will return an array of raw request objects.

#### getAllEntries
```
request.getAllEntries([raw]).then([result handler])
```

Fetches all entries from query. Any query that are bigger than the ebay return limit will be split into multiple queries with smaller time ranges.

_consume_ \<boolean>: When set to false, will return an array of raw request objects.


