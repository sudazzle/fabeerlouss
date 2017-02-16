/*additional setup with other loaders (polyfills, ...)*/
const context = require.context('mocha-loader!./', true, /.+\.spec\.js?$/);
context.keys().forEach(context);
module.exports = context;
