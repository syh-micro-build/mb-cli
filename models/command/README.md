# `@mb-cli/command`

mb-cli 命令包基类，理论上所有命令包都应该继承这个基类，提高命令功能包开发效率，且便于后期统一的升级维护。

## 用法

- 安装

```bash
npm install @mb-cli/command
```

- 使用

```js
// 例如 mb-cli 初始化命令子项目

const Command = require('@mb-cli/command');

class InitCommand extends Command {
 init() {}
 exec() {}
}

function init(cmdActionArgs) {
 return new InitCommand(cmdActionArgs);
}

exports.InitCommand = InitCommand;
module.exports = init;
```