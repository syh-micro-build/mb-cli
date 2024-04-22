# `@mb-cli/init`

mb-cli 的初始化命令功能包，负责初始化项目。

## 用法

- 安装

```bash
npm install @mb-cli/init
```

- mb-cli内使用

@mb-cli/exec 包会根据命令包字典库动态调用

- 三方项目使用

```js
const init = require('@mb-cli/init');
init(cmdActionArgs);
```

## 特性

- 远端模板列表选项
- 初始化目录不为空核查
- 询问机制获取项目初始化信息
- 下载安装模板
- 模板动态渲染
- 自动化依赖安装与项目启动命令白名单验证