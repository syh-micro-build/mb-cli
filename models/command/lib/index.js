'use strict';

const semver = require('semver');
const colors = require('colors/safe');
const log = require('@mb-cli/log');

const LOWEST_NODE_VERSION = '18.12.1';

/**
 * 命令基类
 * @class
 * @classdesc
 * - 初始化参数为 commander action 中函数的形参，参数类型为数组，
 * 包含 commandArgs（arg1，arg2，arg3...）命令参数、commandOpts 命令选项、commandObj 命令对象
 * - 拥有内部方法 initArgs、checkNodeVersion、init（子类实现）、exec（子类实现）
 * @example
 * // commands/init 初始化命令子项目
 * 
 * const Command = require('@mb-cli/command');
 * 
 * class InitCommand extends Command {
 *  init() {}
 *  exec() {}
 * }
 * 
 * function init(cmdActionArgs) {
 *  return new InitCommand(cmdActionArgs);
 * }
 * 
 * exports.InitCommand = InitCommand;
 * module.exports = init;
 */
class Command {
  /**
   * 构造函数
   * @constructs Command 类的构造函数
   * @param {array} args 初始化参数 args 即为 [arg1, arg2..., commandOpts, commandObj]
   */
  constructor(args) {
    if(!args) {
      throw new Error('参数不能为空！');
    }
    if(!Array.isArray(args)) {
      throw new Error('参数必须为数组！');
    }
    this._argv = args
    let runner = new Promise((resolve, reject) => {
      let chain = Promise.resolve();
      chain = chain.then(() => this.checkNodeVersion());
      chain = chain.then(() => this.initArgs());
      chain = chain.then(() => this.init());
      chain = chain.then(() => this.exec());
      chain.catch(err => {
        log.error(err.message);
      });
    });
  }

  /**
   * 初始化基类参数
   */
  initArgs() {
    process.env.LOG_level && (log.level = process.env.LOG_level);
    this._cmd = this._argv[this._argv.length - 1];
    this._argv = Array.prototype.slice.call(this._argv, 0, this._argv.length - 1);
  }

  /**
   * 检查 Node 版本
   */
  checkNodeVersion() {
    const curNodeVersion = process.version;
    const lowestNodeVersion = LOWEST_NODE_VERSION;
    if (!semver.gte(curNodeVersion, lowestNodeVersion)) {
      throw new Error(colors.red(`mb-cli 须安装 v${lowestNodeVersion} 以上版本的 NodeJS，当前版本为 ${curNodeVersion}`));
    }
  }

  /**
   * 由子类实现
   */
  init() {
    throw new Error('init 必须实现！');
  }

  /**
   * 由子类实现
   */
  exec() {
    throw new Error('exec 必须实现！');
  }
}

module.exports = Command;