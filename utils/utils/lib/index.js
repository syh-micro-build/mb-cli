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

module.exports = {
  isObject,
  isArguments,
  spinnerStart
};