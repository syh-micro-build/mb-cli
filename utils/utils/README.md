# `utils`

mb-cli 的工具包集合，主要包含了命令行工具的常用方法，如：参数判断、进度条动画、子进程处理等。

## 用法

- 安装

```bash
npm install @mb-cli/utils
```

- 使用

```js
const {
  isObject,
  isArguments,
  spinnerStart,
  spawnWindowsOrMacOS,
  spawnWindowsOrMacOSSync
} = require('@mb-cli/utils')

/**
 * 判断数据类型是否为对象
 * @param {any} o 所需类型判断的数据
 * @returns 布尔值
 */
isObject(o)

/**
 * 判断数据类型是否为参数对象
 * @param {any} o 所需类型判断的数据
 * @returns 布尔值
 */
isArguments(o)

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
spinnerStart(message, spinnerString = '|/-\\')

/**
 * Node child_process.spawn 兼容方法
 * @param {string} command 命令
 * @param {string[]} args 命令参数
 * @param {object} options spawn 配置项
 * @returns 进程对象
 * @example
 * const child = spawnWindowsOrMacOS('npm', ['install'], {stdio: 'inherit'});
 */
spawnWindowsOrMacOS(command, args, options)

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
spawnWindowsOrMacOSSync(command, args, options)
