#! /usr/bin/env node

const importLocal = require('import-local');

// 脚手架若在项目本地安装，优先使用本地安装版本，而不是全局版本
if (importLocal(__filename)) {
  require('npmlog').info('cli:','正在使用 mb-cli 本地版本');
} else {
  require('../lib')(process.argv.slice(2));
}