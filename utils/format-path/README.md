# `@mb-cli/format-path`

mb-cli 的工具包，主要做路径兼容，当前为 MacOS 与 Windows 兼容。

## 用法

- 安装

```bash
npm install @mb-cli/format-path
```

- 使用

```js
const formatPath = require('@mb-cli/format-path');
console.log(formatPath('/Users/xxx/Desktop/test'));
console.log(formatPath('C:\\Users\\xxx\\Desktop\\test'));
```

