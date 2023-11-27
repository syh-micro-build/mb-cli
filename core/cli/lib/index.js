'use strict';

module.exports = core;

const os = require('os');
const path = require('path');
const fs = require('fs');
const log = require('@mb-cli/log');
const semver = require('semver');
const colors = require('colors/safe');
const minimist = require('minimist');

const pkg = require('../package.json');
const constant = require('./const');

const args = minimist(process.argv.slice(2));

function core() {
  try {
    checkNodeVersion();
    checkPkgVersion();
    checkCurUser();
    checkUserHome();
    checkOpenDebug();
    checkEnv();
    log.verbose('debug','你竟然在参数中添加了--debug...')
  } catch (error) {
    log.error(error)
  }
}

function checkEnv() {
  const dotenv = require('dotenv');
  const dotenvPath = path.resolve(os.userInfo().homedir, '.mbrc');
  if (fs.existsSync(dotenvPath)) {
    dotenv.config({
      path: dotenvPath
    });
  }
  createDefaultRC();
  log.verbose('MB RC', process.env.CLI_HOME_PATH);
}

function createDefaultRC() {
  if (process.env.CLI_HOME) {
    process.env.CLI_HOME_PATH = path.join(os.userInfo().homedir,process.env.CLI_HOME);
  } else {
    process.env.CLI_HOME_PATH = path.join(os.userInfo().homedir,constant.DEFAULT_CLI_HOME);
  }
}

function checkOpenDebug() {
  if (args.debug) {
    log.level = 'verbose'
  }
}

function checkUserHome() {
  log.info('User Home Dir', os.userInfo().homedir);
}

function checkCurUser() {
  log.info('Current User', os.userInfo().username);
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
