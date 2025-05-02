const path = require('path');
const bindings = require('bindings');

const nativeModule = bindings('fisk-native');
module.exports = nativeModule;
