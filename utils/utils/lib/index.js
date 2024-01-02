'use strict';

/**
 * 判断数据类型是否为对象
 * @param {any} o 所需类型判断的数据
 * @returns 布尔值
 */
function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

/**
 * 判断数据类型是否为参数对象
 * @param {any} o 所需类型判断的数据
 * @returns 布尔值
 */
function isArguments(o) {
  return Object.prototype.toString.call(o) === '[object Arguments]';
}

/**
 * 加载动画
 * @param {string} message 加载动画提示信息
 * @param {string} spinnerString 加载动画样式，默认为 '|/-\\'
 * @returns 加载动画对象
 * @example
 * const spinner = spinnerStart('正在下载...');
 * ...
 * spinner.stop(true);
 */
function spinnerStart(message, spinnerString = '|/-\\') {
  const Spinner = require('cli-spinner').Spinner;

  const spinner = new Spinner(message + ' %s');
  spinner.setSpinnerString(spinnerString);
  spinner.start();
  return spinner;
}

/**
 * Node child_process.spawn 兼容方法
 * @param {string} command 命令
 * @param {string[]} args 命令参数
 * @param {object} options spawn 配置项
 * @returns 进程对象
 * @example
 * const child = spawnWindowsOrMacOS('npm', ['install'], {stdio: 'inherit'});
 */
function spawnWindowsOrMacOS(command, args, options) {
  const isWindows = process.platform === 'win32';
  const cmd = isWindows? 'cmd' : command;
  const argsStr = isWindows? ['/c'].concat(command, args) : args;
  return require('child_process').spawn(cmd, argsStr, options || {stdio: 'inherit'});
}

/**
 * Node child_process.spawn 兼容方法（异步）
 * @param {string} command 命令
 * @param {string[]} args 命令参数
 * @param {object} options spawn 配置项
 * @returns Promise
 * @example
 * // code = 0 表示成功
 * const code = await spawnWindowsOrMacOSSync('npm', ['install'], {stdio: 'inherit'});
 */
function spawnWindowsOrMacOSSync(command, args, options) {
  return new Promise((resolve, reject) => {
    spawnWindowsOrMacOS(command, args, options).on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  })
}

module.exports = {
  isObject,
  isArguments,
  spinnerStart,
  spawnWindowsOrMacOS,
  spawnWindowsOrMacOSSync
};