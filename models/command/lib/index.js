'use strict';

const semver = require('semver');
const colors = require('colors/safe');
const log = require('@mb-cli/log');
const { isArguments } = require('@mb-cli/utils');

const LOWEST_NODE_VERSION = '18.12.1';

class Command {
  constructor(args) {
    if(!args) {
      throw new Error('参数不能为空！');
    }
    if(!isArguments(args)) {
      throw new Error('参数必须为 Arguments 对象！');
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

  initArgs() {
    this._cmd = this._argv[this._argv.length - 1];
    this._argv = Array.prototype.slice.call(this._argv, 0, this._argv.length - 1);
  }

  checkNodeVersion() {
    const curNodeVersion = process.version;
    const lowestNodeVersion = LOWEST_NODE_VERSION;
    if (!semver.gte(curNodeVersion, lowestNodeVersion)) {
      throw new Error(colors.red(`mb-cli 须安装 v${lowestNodeVersion} 以上版本的 NodeJS，当前版本为 ${curNodeVersion}`));
    }
  }

  init() {
    throw new Error('init 必须实现！');
  }

  exec() {
    throw new Error('exec 必须实现！');
  }
}

module.exports = Command;