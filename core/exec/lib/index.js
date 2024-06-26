'use strict';

const path = require('path');
const childProcess = require('child_process');

const Package = require('@mb-cli/Package');
const log = require('@mb-cli/log');

const COMMAND_PKG_DIC = require('../dic.json')

const CACHE_DIR = 'dependencies';

/**
 * 根据 命令名称 动态执行 对应命令包
 * 
 * 参数为 commander action 中函数的形参，参数类型为 Arguments 对象，即为 ...[arg1, arg2..., commandOpts, commandObj]
 * 
 * @example
 * const commander = require('commander');
 * 
 * const exec = require('@mb-cli/exec');
 * 
 * const program = new commander.Command();
 * 
 * program
 *  .command('init [projectName]')
 *  .description('初始化项目')
 *  .option('-f, --force', '是否强制初始化项目')
 *  .action(exec);  // .action((arg1,cmdOpts,cmdObj) => exec(arg1,cmdOpts,cmdObj))
 * ...
 */
async function exec() {
  let storeDir = '';
  let pkg;
  let targetPath = process.env.CLI_TARGET_PATH;
  const homePath = process.env.CLI_HOME_PATH;

  const cmdObj = arguments[arguments.length - 1];
  const cmdName = cmdObj.name();
  const packageName = COMMAND_PKG_DIC[cmdName];
  const packageVersion = 'latest';

  if (!targetPath) {// 无本地调试包则远端获取并应用
    targetPath = path.resolve(homePath, CACHE_DIR);
    storeDir = path.resolve(targetPath, 'node_modules');
    pkg = new Package({
      targetPath,
      storeDir,
      packageName,
      packageVersion
    });
    if (await pkg.exists()) {
      await pkg.update();
    } else {
      await pkg.install();
    }
  } else {// 有本地调试包则直接应用
    pkg = new Package({
      targetPath,
      packageName,
      packageVersion
    });
  }

  log.verbose('targetPath',targetPath);
  log.verbose('homePath',homePath);
  log.verbose('storeDir',storeDir);

  const rootFile = pkg.getRootFilePath();
  if(rootFile) {
    try {
      // 简化cmdObj提高传参效率
      const cmdActionArgs = Array.from(arguments);
      const o = Object.create(null);
      Object.keys(cmdObj).forEach(key => {
        if (cmdObj.hasOwnProperty(key) && !key.startsWith('_') && key !== 'parent') {
          o[key] = cmdObj[key]; 
        } else if (key === 'parent') {
          o[key] = {
            opts: cmdObj[key].opts(),
          };
        }
      });
      cmdActionArgs[cmdActionArgs.length - 1] = o;

      // 拼接命令包与参数
      const code = `require('${rootFile}')(${JSON.stringify(cmdActionArgs)})`;

      // 子进程执行命令并监听
      const child = childProcess.spawn('node', ['-e', code], {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'inherit',
      });
      child.on('error', e => {
        log.error(e.message);
        process.exit(1);
      });
      child.on('exit', code => {
        log.verbose('命令执行结束，退出状态码：' + code);
        process.exit(code);
      });
    } catch(e) {
      log.error(e.message);
    }
  }
}

module.exports = exec;