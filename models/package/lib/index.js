'use strict';

const path = require('path');

const pkgDir = require('pkg-dir').sync;

const { isObject } = require('@mb-cli/utils');
const formatPath = require('@mb-cli/format-path');

/**
 * 操作远程包的类
 * @class
 * @classdesc
 * - 初始化参数为一个对象，包含 targetPath 远程包路径、packageName 远程包名、packageVersion 远程包版本号
 * - 拥有内部方法 exists、install、update、getRootFilePath
 * @example
 * const package = new Package({targetPath,packageName,packageVersion});
 * package.exists();
 * ...
 */
class Package {
  /**
   * 构造函数
   * @constructs Package 类的构造函数
   * @param {object} options 初始化参数
   * @param {string} options.targetPath 远程包路径
   * @param {string} options.packageName 远程包名
   * @param {string} options.packageVersion 远程包版本号
   */
  constructor(options) {
    if (!options) {
      throw new Error('Package 类的实例化参数不能为空！');
    }
    if (!isObject(options)) {
      throw new Error('Package 类的实例化参数必须为对象！');
    }
    /**
     * package 路径
     */
    this.targetPath = options.targetPath;
    /**
     * package 名称
     */
    this.packageName = options.packageName;
    /**
     * package 版本号
     */
    this.packageVersion = options.packageVersion;
  }

  /**
   * 判断当前 Package 是否存在
   */
  exists() {

  }

  /**
   * 安装 Package
   */
  install() {

  }

  /**
   * 更新 Package
   */
  update() {

  }

  /**
   * 获取入口文件的路径
   */
  getRootFilePath() {
    const dir = pkgDir(this.targetPath);
    if (dir) {
      const pkgFile = require(path.resolve(dir, 'package.json'));
      if (pkgFile && pkgFile.main) {
        return formatPath(path.resolve(dir, pkgFile.main));
      }
    }
    return null;
  }
}

module.exports = Package;