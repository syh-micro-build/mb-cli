# `@mb-cli/request`

mb-cli 工具包，负责请求 cli 后台服务相关内容。

## 用法

- 安装

```bash
npm install @mb-cli/request
```

- 使用
*使用前可配置环境变量来调整 cli 服务地址，默认为 http://127.0.0.1:7001。*

```js
const request = require('@mb-cli/request');

 request({
  url: 'project/template',
  method: 'GET',
})
```



