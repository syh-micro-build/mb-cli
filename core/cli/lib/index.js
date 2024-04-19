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

const argvArr = process.argv.slice(2);

const isDebug = argvArr.includes('-d') || argvArr.includes('--debug');

// 入口
async function core() {
  try {
    await prepare();
    registerCommand();
  } catch (error) {
    if (isDebug) {
      return console.error(error);
    }
    log.error(error);
  }
}

// 命令注册-核心
function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(require('../package.json').version, '-v, --version', '输出当前版本')
    .helpOption('-h, --help', '帮助')
    .addHelpCommand('help [command]', '显示命令帮助')
    .option('-d, --debug', '开启调试模式', false)
    .option('-tp, --targetPath <targetPath>', '指定本地调试路径', '');

  program
    .command('init [projectName]')
    .description('初始化项目')
    .option('-f, --force', '是否强制初始化项目')
    .action(exec);

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

/**
 * 准备阶段
 */
async function prepare() {
  if (isDebug) {
    process.env.LOG_LEVEL = 'verbose';
    log.level = process.env.LOG_LEVEL;
    log.verbose('debug', colors.yellow('调试模式已开启！'));
    checkPkgVersion();
    checkCurUser();
    checkUserHome();
  }
  checkEnv();
  await checkGlobalUpdate();
}

/**
 * 检查更新
 */
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

/**
 * 检查环境配置信息
 */
function checkEnv() {
  const dotenv = require('dotenv');
  const dotenvPath = path.resolve(os.userInfo().homedir, '.mbrc');
  if (!fs.existsSync(dotenvPath)) {
    const content = '# This is mb-cli environment config file.\n\nCLI_HOME=.mb-cli'
    fs.writeFileSync(dotenvPath, content, 'utf-8');
  }
  dotenv.config({
    path: dotenvPath
  });
  setDefaultTemp();
}

/**
 * 设置默认的临时缓存目录
 */
function setDefaultTemp() {
  if (process.env.CLI_HOME) {
    process.env.CLI_HOME_PATH = path.join(os.userInfo().homedir, process.env.CLI_HOME);
  } else {
    // RC 文件异常时的容错处理
    process.env.CLI_HOME_PATH = path.join(os.userInfo().homedir, constant.DEFAULT_CLI_HOME);
  }
}

/**
 * 检查用户主目录
 */
function checkUserHome() {
  log.verbose('User Home Dir', os.homedir());
}

/**
 * 检查当前用户
 */
function checkCurUser() {
  log.verbose('Current User', os.userInfo().username);
}

/**
 * 检查当前版本
 */
function checkPkgVersion() {
  log.verbose('Cli Version', 'v' + pkg.version);
}
