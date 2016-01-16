**eBay Finding API SDK**

Currently only supporting the finding api, other services will be implemented in the future. Pull requests are very much welcome :)

***Usage:*** require('ebay-sdk')({config})

The factory function takes in a object literal for the following settings

**eBay Configurations**

**SECURITY-APPNAME**  ( *required* ) : eBay developer key goes here.<br>
**SERVICE-VERSION**  ( *default: 1.13.0* ) : eBay api version to use <br>
**RESPONSE-DATA-FORMAT**  ( *default: JSON* ) : supports JSON or XML<br>

***Endpoint configurations***
By default the endpoints are already coded into the sdk, however in the event that you want to configurate it you can do so by passing in the endpoints property with the config object.

```
var customEndpoints = {
	endpoints: {
		production: {
			finding: 'xyz.com'
		},
		sandbox: {
			finding: 'abc.com'
		}
	}
}
```

**Request Configuration**

The library uses request-promise to do the api calls under the hood. To configurate the options for the request call you can either pass in an object liberal to request parameter during the library instantiation or as a third parameter when you call the api.

```
METHOD 1 ( define in ebay config )

var ebayConfig = {
	'SECURITY-APPNAME': devKey,
	request: {
		json: true,
		uri: 'xyz.com'
	}
}

METHOD 2 ( define in third parameter )

ebay.finding('findCompletedItems', { keywords: iphone6 }, { json: false })

```

**Calling API**

**ebay.finding( api name (string), { search arguments (object) })**

[click here for list of api](http://developer.ebay.com/DevZone/finding/CallRef/index.html)<br>

**Sample**

```
var devKey = xxxxxxxxx-xxxx-xxxx-xxxxxxxxxxx;
var config = {
	'SECURITY-APPNAME': devKey,
	'SERVICE-VERSION': (optional),
	'RESPONSE-DATA-FORMAT': (optional, defaults to JSON)
	'sandbox': true (defaults to false)
}

var ebay = require('ebay-sdk')(config);

var callOptions = {
	keywords: 'iPhone6'
};
var callApi = 'findCompletedItems';

ebay.finding(callApi, callOptions)
	.then(function(res) {
		console.log(res);
	})
	.catch(function(err) {
		console.log(err);
	}
```


