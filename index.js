const path = require('path');
const bindings = require('bindings');

const nativeModule = bindings('your_module_name');
module.exports = nativeModule;
