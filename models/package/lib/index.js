'use strict';

const path = require('path');
const os = require('os');

const pkgDir = require('pkg-dir').sync;
const npminstall = require('npminstall');
const pathExists = require('path-exists').sync;
const fse = require('fs-extra');

const { isObject } = require('@mb-cli/utils');
const formatPath = require('@mb-cli/format-path');
const { getDefaultRegistry, getNpmLatestVersion } = require('@mb-cli/get-npm-info');

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
   * @param {string} options.targetPath 远程包安装根目录
   * @param {string} options.storeDir 远程包缓存目录
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
     * package 安装根目录
     */
    this.targetPath = options.targetPath;
    /**
     * package 缓存目录
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
   * 如果指定包版本为 latest，则转换为最新版本号
   */
  async prepare() {
    if (this.storeDir && !pathExists(this.storeDir)) {
      fse.mkdirpSync(this.storeDir);
    }
    if (this.packageVersion === 'latest') {
      this.packageVersion = await getNpmLatestVersion(this.packageName)
    }
  }

  /**
   * 获取当前 npm 包缓存路径（兼容 MacOS 与 Windows）
   * @param {string} packageVersion 当前 npm 包特定版本号
   * @returns 当前 npm 包特定/默认版本缓存路径
   */
  getCacheFilePath(packageVersion = '') {
    if (os.type() === 'Windows_NT') {
      const packageNameArr = this.packageName.split('/');
      if (packageNameArr.length > 1) {
        const [origin, packageName] = packageNameArr;
        return path.resolve(
          this.storeDir,
          '.store',
          `${origin}+${packageName}@${packageVersion || this.packageVersion}`,
          'node_modules',
          origin,
          packageName,
          'template'
        );
      } else {
        return path.resolve(
          this.storeDir,
          '.store',
          `${this.packageName}@${packageVersion || this.packageVersion}`,
          'node_modules',
          this.packageName,
          'template'
        );
      }
    } else if (os.type() === 'Darwin') {
      const cacheFilePathPreFix = this.packageName.replace('/', '_');
      return path.resolve(this.storeDir, `_${cacheFilePathPreFix}@${packageVersion || this.packageVersion}@${this.packageName}`, 'template');
    }
    return null;
  }

  /**
   * 判断当前 package 是否存在
   */
  async exists() {
    if (this.storeDir) {
      await this.prepare();
      return pathExists(this.getCacheFilePath())
    } else {
      return pathExists(this.targetPath);
    }
  }

  /**
   * 安装 package
   */
  async install() {
    await this.prepare();
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
  async update() {
    await this.prepare();
    const latestPackageVersion = await getNpmLatestVersion(this.packageName);
    const latestFilePath = this.getCacheFilePath(latestPackageVersion);
    if (!pathExists(latestFilePath)) {
      await npminstall({
        root: this.targetPath,
        storeDir: this.storeDir,
        registry: getDefaultRegistry(true),
        pkgs: [
          {
            name: this.packageName,
            version: latestPackageVersion,
          }
        ],
      });
    }
    this.packageVersion = latestPackageVersion;
  }

  /**
   * 获取入口文件的路径
   */
  getRootFilePath() {
    if (this.storeDir) {
      return _getRootFile(this.getCacheFilePath());
    } else {
      return _getRootFile(this.targetPath);
    }

    function _getRootFile(targetPath) {
      const dir = pkgDir(targetPath);
      if (dir) {
        const pkgFile = require(path.resolve(dir, 'package.json'));
        if (pkgFile && pkgFile.main) {
          return formatPath(path.resolve(dir, pkgFile.main));
        }
      }
      return null;
    }
  }
}

module.exports = Package;