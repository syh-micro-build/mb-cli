'use strict';

module.exports = core;

const log = require('@mb-cli/log');
const semver = require('semver');
const colors = require('colors/safe');

const pkg = require('../package.json');
const constant = require('./const');

function core() {
  try {
    checkNodeVersion();
    checkPkgVersion();
  } catch (error) {
    log.error(error)
  }
}

function checkNodeVersion() {
  const curNodeVersion = process.version;
  const lowestNodeVersion = constant.LOWEST_NODE_VERSION;
  if (!semver.gte(curNodeVersion, lowestNodeVersion)) {
    throw new Error(colors.red(`mb-cli 须安装 v${lowestNodeVersion} 以上版本的 NodeJS，当前版本为 ${curNodeVersion}`));
  }
  log.info('Node Version', process.version);
}

function checkPkgVersion() {
  log.info('Cli Version', 'v'+pkg.version);
}
