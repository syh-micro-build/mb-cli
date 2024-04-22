# `@mb-cli/exec`

mb-cli 动态执行命令包，根据命令行参数中的命令名称动态执行对应命令包。

## 使用方法

- 安装

```bash
npm i @mb-cli/exec
```

- 使用

```js
const commander = require('commander');

// exec 函数参数为 commander action 中函数的形参，参数类型为 Arguments 对象，即为 ...[arg1, arg2..., commandOpts, commandObj]
const exec = require('@mb-cli/exec');

const program = new commander.Command();

program
 .command('init [projectName]')
 .description('初始化项目')
 .option('-f, --force', '是否强制初始化项目')
 .action(exec);  // .action((arg1,cmdOpts,cmdObj) => exec(arg1,cmdOpts,cmdObj))
...
```

- 命令字典配置

*待完善。。。*