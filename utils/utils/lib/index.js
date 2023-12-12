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

module.exports = {
  isObject,
  isArguments
};