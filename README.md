# eBay SDK


API Support

 * **Finding** (Full)
 * **Shopping** (Full)

#### Usage:

```javascript
var config = {devKey: xxxxxxx};
var ebay = require('ebay-sdk')(config);

ebay
  .findCompletedItems // All supported apis are available as methods
  .call({keywords: 'iphone'})
  // Promise
  .then(function(result) { /* Do Something */ });
  // Stream
  .pipe(stream);
```

**Initialization**: ```require('ebay-sdk')({config})```

The configuration object takes in the following parameters:

- ***devKey*** (_required_):  
ebay developer key
- ***serviceVersion*** (_optional_):   
takes in object with api service as key and service number as value
- ***responseFormat*** (_optional_):   
xml or json

**Calls**: ```ebay.[api].call({query})```

- **api**: All the supported api under the services that are supported, reference ebay api doc for exact names
- **query**: Key / value pairs all the arguments available to each api
```javascript
var query = {
  // Nested example
  itemFilter: [
    {name: 'Condition', value: ['New', 'Like New']} // Multiple values for one filter
    {name: 'ExcludeCategory', value: '132112112'}
  ],
  // Simple key value pair
  keywords: 'iphone'
}
````

