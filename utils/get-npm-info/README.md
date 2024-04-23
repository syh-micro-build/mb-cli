# `get-npm-info`

mb-cli 的工具包，主要负责与 npm 相关的操作，如获取包信息、获取并对比包版本信息、npm 源选取等。

## 用法

- 安装

```bash
npm install @mb-cli/get-npm-info
```

- 使用

```js
const {
  getNpmInfo,
  getNpmVersions,
  getNpmSemverVersion,
  getDefaultRegistry,
  getNpmLatestVersion
} = require('@mb-cli/get-npm-info');

/**
 * 获取 npm 包信息
 * @param {string} npmName npm 包名称
 * @param {string} registry 默认为 npm 官方源
 * @returns npm 包信息
 */
getNpmInfo(npmName)

/**
 * 获取默认npm 源
 * @param {boolean} isOriginal 是否为官方源
 * @returns 官方源 或 淘宝源
 */
getDefaultRegistry(isOriginal)

/**
 * 获取 npm 版本号集合
 * @param {string} npmName npm 包名称
 * @param {string} registry npm 源
 * @returns 版本号集合
 */
getNpmVersions(npmName, registry)

/**
 * 获取符合 npm 依赖规则的版本号集合
 * @param {string} baseVersion 基础版本（package.json 中显示的版本）
 * @param {string} versions 版本号集合
 * @returns 符合 npm 依赖规则的版本号集合，并从大到小排列，例如：符合 ^1.0.0 的包为 ['1.2.0','1.1.0','1.0.1',...]
 */
getSemverVersions(baseVersion, versions)

/**
 * 获取符合指定 npm 包依赖规则的最新版本号
 * @param {string} baseVersion 基础版本（package.json 中显示的版本）
 * @param {string} npmName npm 包名称
 * @param {string} registry npm 源
 * @returns npm 仓库中指定包符合依赖规则的最新版本号
 */
getNpmSemverVersion(baseVersion, npmName, registry)

/**
 * 获取指定 npm 包的最新版本号
 * @param {string} npmName npm 包名称
 * @param {string} registry npm 源
 * @returns npm 仓库中指定包的最新版本号
 */
getNpmLatestVersion(npmName, registry)
