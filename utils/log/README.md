# `@mb-cli/log`

mb-cli 的工具包，主要负责日志输出相关内容，例如调节日志级别，日志样式等。

## 用法

- 安装

```bash
npm install @mb-cli/log
```

- 使用

```js
const log = require('@mb-cli/log');
log.info('info');
log.success('success');
log.error('error');
log.warning('warning');
log.verbose('verbose');
log.debug('debug');
log.setLevel('verbose');
```
