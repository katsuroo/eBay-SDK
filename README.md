<h2>eBay FindingAPI SDK</h2>

<p>Currently only supporting the finding api, other services will be implemented in the future. Pull requests are very much welcome :)</p>

<b>new</b> ebay({ config (object) })

<p>
The constructor function takes in a object literal for the following settings
</p>

<b>eBay configurations</b><br>
<i>SECURITY-APPNAME (required)</i> : eBay developer key goes here.<br>
<i>SERVICE-VERSION (default: 1.13.0)</i> : eBay api version to use <br>
<i>RESPONSE-DATA-FORMAT (default: JSON)</i> : supports JSON or XML<br>

<b>Endpoint configurations</b><br>
<p>By default the endpoints are already coded into the sdk, however in 
the event that you want to configurate it you can do so by passing in the endpoints
property with the config object.</p>

```
var customEndpoints = {
	endpoints: {
		production: {
			finding: 'xyz.com'
		},
		sandbox: {
			finding
		}
	}
}
```

<b>Calling API</b><br>

<b></b> ebay.finding( api name (string), { search arguments (object) })
<p>
[click here for list of api]('http://developer.ebay.com/DevZone/finding/CallRef/index.html')<br>
[click here for list of search arguments for each api]('http://developer.ebay.com/DevZone/finding/CallRef/index.html')
</p>
<h3>Sample</h3>
```
var sdk = require('ebay-sdk');

var devKey = xxxxxxxxx-xxxx-xxxx-xxxxxxxxxxx;
var config = {
	'SECURITY-APPNAME': devKey,
	'SERVICE-VERSION': (optional),
	'RESPONSE-DATA-FORMAT': (optional, defaults to JSON)
	'sandbox': true (defaults to false)
}

var ebay = new sdk(config);

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


