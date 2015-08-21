var async = require('async');
var RawSource = require('webpack/lib/RawSource');
var BOM = new Buffer('\uFEFF');

function AddBomPlugin(options) {
	options = options || {};
	this.regExp = options.regExp;
}
module.exports = AddBomPlugin;

AddBomPlugin.prototype.apply = function (compiler) {
	compiler.plugin('this-compilation', function (compilation) {
		compilation.plugin('optimize-assets', function (assets, callback) {
			async.forEach(Object.keys(assets), function (file, callback) {
				if (this.regExp && !this.regExp.test(file)) {
					return callback();
				}
				var asset = assets[file];
				var content = asset.source();
				if (!Buffer.isBuffer(content)) {
					content = new Buffer(content, 'utf-8');
				}
				var contents = Buffer.concat([BOM, file.contents]);
				assets[file] = new RawSource(contents);
			}.bind(this), callback);
		}.bind(this));
	}.bind(this));
};
