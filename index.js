const native = require("./fisk-native.node");

module.exports.getpwnam = native.getpwnam;
module.exports.setrlimit = native.setrlimit;
module.exports.chroot = native.chroot;
