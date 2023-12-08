'use strict';

const path = require('path');

const pkgDir = require('pkg-dir').sync;
const npminstall = require('npminstall');

const { isObject } = require('@mb-cli/utils');
const formatPath = require('@mb-cli/format-path');
const { getDefaultRegistry } = require('@mb-cli/get-npm-info');

/**
 * 操作远程包的类
 * @class
 * @classdesc
 * - 初始化参数为一个对象，包含 targetPath 远程包安装路径、storeDir 远程包缓存路径、packageName 远程包名、packageVersion 远程包版本号
 * - 拥有内部方法 exists、install、update、getRootFilePath
 * @example
 * const package = new Package({targetPath,storeDir,packageName,packageVersion});
 * package.exists();
 * ...
 */
class Package {
  /**
   * 构造函数
   * @constructs Package 类的构造函数
   * @param {object} options 初始化参数
   * @param {string} options.targetPath 远程包安装路径
   * @param {string} options.storeDir 远程包缓存路径
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
     * package 安装路径
     */
    this.targetPath = options.targetPath;
    /**
     * package 缓存路径
     */
    this.storeDir = options.storeDir;
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
   * 判断当前 package 是否存在
   */
  exists() {

  }

  /**
   * 安装 package
   */
  install() {
    return npminstall({
      root: this.targetPath,
      storeDir: this.storeDir,
      registry: getDefaultRegistry(true),
      pkgs: [
        {
          name: this.packageName,
          version: this.packageVersion,
        }
      ],
    })
  }

  /**
   * 更新 package
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