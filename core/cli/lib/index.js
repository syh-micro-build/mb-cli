'use strict';

module.exports = core;

const os = require('os');
const path = require('path');
const fs = require('fs');
const commander = require('commander');
const log = require('@mb-cli/log');
const semver = require('semver');
const colors = require('colors/safe');
const minimist = require('minimist');

const pkg = require('../package.json');
const constant = require('./const');

const args = minimist(process.argv.slice(2));
const program = new commander.Command();

async function core() {
  try {
    checkNodeVersion();
    checkPkgVersion();
    checkCurUser();
    checkUserHome();
    // checkOpenDebug();
    checkEnv();
    await checkGlobalUpdate();
    registerCommand();
  } catch (error) {
    log.error(error)
  }
}

function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false);

  program.on('option:debug', function () {
    this.opts().debug && (log.level = 'verbose');
    log.verbose('debug', '你竟然在参数中添加了--debug...')
  })

  program.on('command:*', function (obj) {
    const availableCommands = program.commands.map(cmd => cmd.name());
    console.log(colors.red('未知的命令：' + obj[0]));
    console.log(colors.red('可用命令：' + availableCommands.join(',')));
  })

  if (program.args && program.args.length < 1) {
    console.log();
    program.outputHelp();
    console.log();
  }

  program.parse(process.argv);
}

async function checkGlobalUpdate() {
  const curVersion = pkg.version;
  const npmName = pkg.name;
  const { getNpmSemverVersion } = require('@mb-cli/get-npm-info');
  const lastVersion = await getNpmSemverVersion(curVersion, npmName);
  if (lastVersion && semver.gt(lastVersion, curVersion)) {
    log.warn(colors.yellow(`请手动更新 ${npmName}，当前版本：${curVersion}，最新版本：${lastVersion}
        更新命令：npm install -g ${npmName}`));
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
    process.env.CLI_HOME_PATH = path.join(os.userInfo().homedir, process.env.CLI_HOME);
  } else {
    process.env.CLI_HOME_PATH = path.join(os.userInfo().homedir, constant.DEFAULT_CLI_HOME);
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
  log.info('Cli Version', 'v' + pkg.version);
}
