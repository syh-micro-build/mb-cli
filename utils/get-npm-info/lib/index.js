'use strict';

const axios = require('axios');
const urlJoin = require('url-join');
const semver = require('semver');

/**
 * 获取 npm 包信息
 * @param {string} npmName npm 包名称
 * @param {string} registry npm 源
 * @returns npm 包信息
 */
function getNpmInfo(npmName, registry = '') {
  if (!npmName) {
    return null;
  }
  const registryUrl = registry || getDefaultRegistry();
  const npmInfoUrl = urlJoin(registryUrl, npmName);
  return axios.get(npmInfoUrl).then(res => {
    if (res.status === 200) {
      return res.data;
    }
    return null;
  }).catch(err => {
    return Promise.reject(err);
  })
}

/**
 * 获取默认npm 源
 * @param {boolean} isOriginal 是否为官方源
 * @returns 官方源 或 淘宝源
 */
function getDefaultRegistry(isOriginal = true) {
  return isOriginal ? 'https://registry.npmjs.org' : 'https://registry.npmmirror.com';
}

/**
 * 获取 npm 版本号集合
 * @param {string} npmName npm 包名称
 * @param {string} registry npm 源
 * @returns 版本号集合
 */
async function getNpmVersions(npmName, registry = '') {
  const data = await getNpmInfo(npmName, registry);
  if (data) {
    return Object.keys(data.versions);
  } else {
    return [];
  }
}

/**
 * 获取符合 npm 依赖规则的版本号集合
 * @param {string} baseVersion 基础版本（package.json 中显示的版本）
 * @param {string} versions 版本号集合
 * @returns 符合 npm 依赖规则的版本号集合，并从大到小排列，例如：符合 ^1.0.0 的包为 ['1.2.0','1.1.0','1.0.1',...]
 */
function getSemverVersions(baseVersion, versions) {
  return versions
    .filter(version => semver.satisfies(version, `^${baseVersion}||~${baseVersion}`))
    .sort((a, b) => semver.compare(b, a));
}

/**
 * 获取符合指定 npm 包依赖规则的最新版本号
 * @param {string} baseVersion 基础版本（package.json 中显示的版本）
 * @param {string} npmName npm 包名称
 * @param {string} registry npm 源
 * @returns npm 仓库中指定包符合依赖规则的最新版本号
 */
async function getNpmSemverVersion(baseVersion, npmName, registry = '') {
  const versions = await getNpmVersions(npmName, registry);
  const newVersions = getSemverVersions(baseVersion, versions);
  if (newVersions && newVersions.length > 0) {
    return newVersions[0]
  }
  return null;
}

/**
 * 获取指定 npm 包的最新版本号
 * @param {string} npmName npm 包名称
 * @param {string} registry npm 源
 * @returns npm 仓库中指定包的最新版本号
 */
async function getNpmLatestVersion(npmName, registry = '') {
  const versions = await getNpmVersions(npmName, registry);
  if (versions) return versions.sort((a, b) => semver.compare(b, a))[0];
  return null;
}

module.exports = {
  getNpmInfo,
  getNpmVersions,
  getNpmSemverVersion,
  getDefaultRegistry,
  getNpmLatestVersion
}
