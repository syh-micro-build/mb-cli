'use strict';

module.exports = core;

const os = require('os');
const path = require('path');
const fs = require('fs');
const commander = require('commander');
const semver = require('semver');
const colors = require('colors/safe');

const log = require('@mb-cli/log');
const init = require('@mb-cli/init');
const exec = require('@mb-cli/exec');

const pkg = require('../package.json');
const constant = require('./const');

const program = new commander.Command();

async function core() {
  try {
    await prepare();
    registerCommand();
  } catch (error) {
    if (program.opts().debug) {
      return console.error(error);
    }
    log.error(error);
  }
}

function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .option('-tp, --targetPath <targetPath>', '是否指定本地调试路径', '');

  program
    .command('init [projectName]')
    .description('初始化项目')
    .option('-f, --force', '是否强制初始化项目')
    .action(exec);

  program.on('option:debug', function () {
     if (this.opts().debug) {
      process.env.LOG_LEVEL = 'verbose';
      log.level = process.env.LOG_LEVEL;
      log.verbose('debug', colors.yellow('调试模式已开启！'));
    }
  })

  program.on('option:targetPath', function (targetPath) {
    process.env.CLI_TARGET_PATH = targetPath;
  })

  program.on('command:*', function (obj) {
    const availableCommands = program.commands.map(cmd => cmd.name());
    console.log(colors.red('未知的命令：' + obj[0]));
    console.log(colors.red('可用命令：' + availableCommands.join(',')));
    program.outputHelp();
  })

  program.parse(process.argv);
}

async function prepare() {
  checkPkgVersion();
  checkCurUser();
  checkUserHome();
  checkEnv();
  await checkGlobalUpdate();
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
}

function createDefaultRC() {
  if (process.env.CLI_HOME) {
    process.env.CLI_HOME_PATH = path.join(os.userInfo().homedir, process.env.CLI_HOME);
  } else {
    process.env.CLI_HOME_PATH = path.join(os.userInfo().homedir, constant.DEFAULT_CLI_HOME);
  }
}

function checkUserHome() {
  log.info('User Home Dir', os.userInfo().homedir);
}

function checkCurUser() {
  log.info('Current User', os.userInfo().username);
}

function checkPkgVersion() {
  log.info('Cli Version', 'v' + pkg.version);
}
