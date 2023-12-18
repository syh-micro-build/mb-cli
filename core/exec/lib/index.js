'use strict';

const path = require('path');
const childProcess = require('child_process');

const Package = require('@mb-cli/Package');
const log = require('@mb-cli/log');

const SETTINGS = {
  init: '@mb-cli/init'
}

const CACHE_DIR = 'dependencies';

/**
 * 根据 命令名称 动态执行 对应命令包
 * 
 * 参数为 commander action 中函数的形参，参数类型为 Arguments 对象，即为 ...[arg1, arg2..., commandOpts, commandObj]
 * 
 * @example
 * const commander = require('commander');
 * 
 * const { exec } = require('@mb-cli/commander');
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
  const packageName = SETTINGS[cmdName];
  const packageVersion = 'latest';

  if (!targetPath) {
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
  } else {
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
      const code = `require('${rootFile}')(${JSON.stringify(cmdActionArgs)})`;
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
        log.verbose('命令执行成功，退出状态码：' + code);
        process.exit(code);
      });
    } catch(e) {
      log.error(e.message);
    }
  }
}

module.exports = exec;