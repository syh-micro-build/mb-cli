# `@mb-cli/package`

mb-cli 的包管理工具，可进行包的安装、更新、检测。

## 用法

- 安装

```bash
npm install @mb-cli/package
```

-使用

```js
const package = new Package({targetPath,storeDir,packageName,packageVersion});
package.exists();
...
```