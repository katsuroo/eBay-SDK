# eBay SDK


API Support

 * **Finding** (Full)
 * **Shopping** (Partial)

#### Usage:

```javascript
var config = {devKey: xxxxxxx};
var ebay = require('ebay-sdk')(config);

var query = {
	keywords: 'iphone'
}

// All supported apis are available as methods

ebay.findCompletedItems.call(query)
	.then(function(result) {
    	// Do Something
    });
```