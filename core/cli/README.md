# @mb-cli/core

mb-cli 核心包，主要负责命令的注册和执行方法分配，拥有自动检查最新版本、自动创建配置文件、自动设置缓存路径等功能，也负责着监听调试模式的开启状态并下发至所有子包，调试开启时报错日志更加详细，启动时会自动检查当前版本、当前用户 及 用户主目录。

## 使用方法

### 全局安装

- 安装

```bash
npm install -g @mb-cli/core
```

- 使用

```bash
mb-cli -v
mb-cli -h
```

### 不安装

- 使用

```bash
npx @mb-cli/core -v
npx @mb-cli/core -h
```

### 卸载

```bash
npm uninstall -g @mb-cli/core
```
