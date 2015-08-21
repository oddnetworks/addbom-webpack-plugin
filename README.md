# add byte order mark plugin for webpack

## Usage

``` javascript
var AddBomPlugin = require("addbom-webpack-plugin");
module.exports = {
	plugins: [
		new AddBomPlugin({
			regExp: /\.js$|\.html$/
		})
	]
}
```

Arguments:

* `regExp`: All assets matching this RegExp are processed. Defaults to every asset.

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
