<div align="center"> <a href="https://github.com/syh-micro-build/mb-cli"> <img width="100" src="./public/logo.png"> </a> <br> <br>

[![license](https://img.shields.io/github/license/syh-micro-build/mb-cli.svg)](LICENSE) [![repo-size](https://img.shields.io/github/repo-size/syh-micro-build/mb-cli.svg)](repo-size) [![last-commit](https://img.shields.io/github/last-commit/syh-micro-build/mb-cli.svg)](last-commit) [![stars](https://img.shields.io/github/stars/syh-micro-build/mb-cli.svg)](stars) [![forks](https://img.shields.io/github/forks/syh-micro-build/mb-cli.svg)](forks) [![release](https://img.shields.io/github/release/syh-micro-build/mb-cli.svg)](release) [![watchers](https://img.shields.io/github/watchers/syh-micro-build/mb-cli.svg)](watchers)

<h1>mb-cli</h1>
</div>

## 介绍

mb-cli 是一个服务于 Micro Build 生态的脚手架工具。主要用于创建和发布 Micro Build 中的组件、模块或应用，为开发人员生成模板，使其专注于核心业务开发并快速产出上线，同时它具备对接大型代码托管平台的能力（官方默认支持GitHub，GitLab 及 Gitee）。由于 mb-cli 采用 Lerna 架构模式，因此它天然具备强大的功能拓展能力，当然多包管理也轻而易举。

## 特性

- **自动化**：自动化创建发布项目
- **工程化**: 统一的工程模板及规范管理
- **代码仓兼容**: 兼容多种代码托管平台
- **拓展性**: Lerna 架构允许你轻松扩展和管理功能包
- **配置库**: 配置灵活，快速定制私有命令行工具
- **统计服务**: 配套统计服务模块，零成本接入

## 官方文档

详细功能及用法请看 [官方文档👈](https://syh-micro-build.github.io/mb-cli/)

## 前序准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) - 项目开发环境
- [lerna](https://lerna.js.org/) - 熟悉 lerna 特性与使用方法

## 安装和使用

### 全局安装使用（推荐）

- 安装

```bash
npm i -g @mb-cli/core
```

- 使用

```bash
mb-cli -h
```

### 直接使用

```bash
npx mb-cli -h
```

## 更新日志
预留

## 如何贡献

<a href="https://github.com/syh-micro-build/mb-cli/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=syh-micro-build/mb-cli" />
</a>

你可以[提一个 issue](https://github.com/syh-micro-build/mb-cli/issues/new) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## Git 贡献提交规范

- `feat`: ✨ 新增功能 | A new feature'
- `fix`: 🐛 修复缺陷 | A bug fix'
- `docs`: 📝 文档更新 | Documentation only changes'
- `style`: 💄 代码格式 | Changes that do not affect the meaning of the code'
- `refactor`: ♻️ 代码重构 | A code change that neither fixes a bug nor adds a feature'
- `perf`: ⚡️ 性能提升 | A code change that improves performance'
- `test`: ✅ 测试相关 | Adding missing tests or correcting existing tests'
- `build`: 📦️ 构建相关 | Changes that affect the build system or external dependencies'
- `ci`: 🎡 持续集成 | Changes to our CI configuration files and scripts'
- `chore`: 🔨 其他修改 | Other changes that do not modify src or test files'
- `revert`: ⏪️ 回退代码 | Revert to a commit'

## 捐赠

捐赠开源，让技术照亮更多人的未来~~~

- 支付宝
<img src="https://raw.githubusercontent.com/ShanYi-Hui/images/main/alipay.png" style="width: 200px;" />

- 微信
<img src="https://raw.githubusercontent.com/ShanYi-Hui/images/main/weixinpay.png"  style="width: 200px;"/>

## 技术交流

欢迎大家加入技术交流群，探讨技术，一起进步~~~

- qq群：415849653
<img src="https://raw.githubusercontent.com/ShanYi-Hui/images/main/qqgroup.png" style="width: 200px;" />

- 微信群
<img src="https://raw.githubusercontent.com/ShanYi-Hui/images/main/weixingroup.png" style="width: 200px;" />

## 许可证

[MIT](./LICENSE)