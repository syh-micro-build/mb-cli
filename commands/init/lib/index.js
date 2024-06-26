'use strict';

const fs = require('fs');
const os = require('os');

const iq = require('inquirer');
const fse = require('fs-extra');
const colors = require('colors');
const semver = require('semver');
const glob = require('glob');
const ejs = require('ejs');

const Command = require('@mb-cli/command');
const Package = require('@mb-cli/package');
const log = require('@mb-cli/log');
const { spinnerStart, spawnWindowsOrMacOSSync } = require('@mb-cli/utils');

const getProjectTemplate = require('./getProjectTemplate');
const path = require('path');

const TYPE_PROJECT = 'project';
const TYPE_COMPONENT = 'component';
const TEMPLATE_TYPE_NORMAL = 'normal';
const TEMPLATE_TYPE_CUSTOM = 'custom';
const WHITE_COMMANDS = ['npm', 'cnpm', 'yarn'];

/**
 * 初始化命令类，基于 Command 类（详细请查看 \@mb-cli/command 包）
 * @class
 * @classdesc
 * - 初始化参数为一个对象，参数为 commander action 中函数的形参，参数类型为 Arguments 对象所转换成的 Arrar 对象，即为 [arg1, arg2..., commandOpts, commandObj]，其中 commandObj 已去除无用属性
 * - 拥有内部方法 init、exec、installTemplate、checkCommand、execCommand、ejsRender、installNormalTemplate、installCustomTemplate、downloadTemplate、prepare、getProjectInfo、isDirEmpty 方法
 * @example
 * const init = new InitCommand(cmdActionArgs);
 * init()
 * ...
 */
class InitCommand extends Command {
  /**
   * 初始化
   * 
   * 从命令行解析出 projecName(项目名称) 与 force(是否强制初始化)
   */
  init() {
    this.projectName = this._argv[0] || '';
    this.force = this._argv[1].force || false;
    log.verbose('projectName', this.projectName);
    log.verbose('force', this.force);
  }

  /**
   * 执行下载模板与安装模板
   */
  async exec() {
    try {
      const projectInfo = await this.prepare();
      if (projectInfo) {
        this.projectInfo = projectInfo;
        await this.downloadTemplate();
        await this.installTemplate();
      }
    } catch (error) {
      log.error(error.message);
      log.verbose(error);
    }
  }

  /**
   * 安装模板
   */
  async installTemplate() {
    if (this.templateInfo) {
      if (!this.templateInfo.type) {
        this.templateInfo.type = TEMPLATE_TYPE_NORMAL;
      }
      if (this.templateInfo.type === TEMPLATE_TYPE_NORMAL) {
        await this.installNormalTemplate();
      } else if (this.templateInfo.type === TEMPLATE_TYPE_CUSTOM) {
        await this.installCustomTemplate();
      } else {
        throw new Error('模板类型错误');
      }
    } else {
      throw new Error('模板不存在');
    }
  }

  /**
   * 检查命令是否在白名单
   * @param {*} command 命令名称
   * @returns null
   */
  checkCommand(command) {
    if (WHITE_COMMANDS.includes(command)) return command;
    return null;
  }

  /**
   * 执行命令
   * 
   * 命令若不支持将报错并返回支持的命令列表
   * @param {*} command 命令名称
   * @param {*} successMessage 执行成功的提示
   * @param {*} errMessage 执行失败的提示
   * @returns 
   */
  async execCommand(command, successMessage, errMessage) {
    if (!command) return;
    const cmdArr = command.split(' ');
    const cmd = this.checkCommand(cmdArr[0]);
    if (!cmd) {
      throw new Error(`不支持的命令:${command}，当前支持命令：${WHITE_COMMANDS.join('、')}`);
    }
    const args = cmdArr.slice(1);
    const code = await spawnWindowsOrMacOSSync(cmd, args, {
      cwd: process.cwd(),
      env: process.env,
      stdio: 'inherit',
    });
    if (code !== 0) {
      log.error(errMessage);
      process.exit(1);
    } else {
      log.success(successMessage);
    }
  }

  /**
   * 模板渲染
   * @param {*} options 模板渲染所需的参数
   * @returns Promise对象
   */
  async ejsRender(options) {
    return new Promise((resolve, reject) => {
      glob('**', {
        cwd: process.cwd(),
        ignore: options.ignore,
        nodir: true,
      }, (err, files) => {
        if (err) {
          reject(err);
        }
        Promise.all(files.map(file => {
          const filePath = path.join(process.cwd(), file);
          return new Promise((resolve1, reject1) => {
            ejs.renderFile(filePath, this.projectInfo, (err, str) => {
              if (err) {
                reject1(err);
              } else {
                fs.writeFileSync(filePath, str);
                resolve1(str);
              }
            });
          })
        })).then(() => {
          resolve();
        }).catch(err => {
          reject(err);
        });
      })
    });
  }

  /**
   * 安装标准模板
   */
  async installNormalTemplate() {
    let spinner = spinnerStart('正在安装模板...');
    try {
      const templatePath = this.templateNpm.getCacheFilePath();
      const targetPath = process.cwd();
      fse.ensureDirSync(templatePath);
      fse.ensureDirSync(targetPath);
      fse.copySync(templatePath, targetPath);
      spinner.stop(true);
      log.success('模板安装完成！');
      const templateIgnore = this.templateInfo.ignore || [];
      const ignore = ['**/node_modules/**', ...templateIgnore];
      await this.ejsRender({ ignore });
      const { installCommand, startCommand } = this.templateInfo;
      await this.execCommand(installCommand, '依赖安装成功！', '依赖安装失败！');
      await this.execCommand(startCommand, '项目启动成功！', '项目启动失败！');
    } catch (error) {
      spinner.stop(true);
      throw error;
    }
  }

  /**
   * 安装自定义模板
   */
  async installCustomTemplate() {
    console.log('正在安装自定义模板...');
  }

  /**
   * 下载模板
   */
  async downloadTemplate() {
    const { projectTemplate } = this.projectInfo;
    const templateInfo = this.template.find(item => item.npmName === projectTemplate);
    this.templateInfo = templateInfo;
    const { npmName, version } = templateInfo;
    const userHome = os.homedir();
    const targetPath = path.resolve(userHome, '.mb-cli', 'template');
    const storeDir = path.resolve(userHome, '.mb-cli', 'template', 'node_modules');
    const templateNpm = new Package({
      targetPath,
      storeDir,
      packageName: npmName,
      packageVersion: version,
    });
    this.templateNpm = templateNpm;
    if (! await templateNpm.exists()) {
      const spinner = spinnerStart('正在下载模板...');
      try {
        await templateNpm.install();
        spinner.stop(true);
        log.success('模板下载完成！');
      } catch (error) {
        spinner.stop(true);
        throw error;
      }
    } else {
      const spinner = spinnerStart('正在更新模板...');
      try {
        await templateNpm.update();
        spinner.stop(true);
        log.success('模板更新完成！');
      } catch (error) {
        spinner.stop(true);
        throw error;
      }
    }
  }

  /**
   * 初始化准备阶段
   * 
   * 获取模板信息，判断执行目录是否为空，不为空是否清空并继续初始化项目
   * @returns 
   */
  async prepare() {
    const template = await getProjectTemplate();
    if (!template || template.length === 0) {
      throw new Error('没有找到项目模板');
    }
    this.template = template;
    const currentPath = process.cwd();
    if (!this.isDirEmpty(currentPath)) {
      let isContinue = false;
      if (!this.force) {
        isContinue = (await iq.prompt([{
          type: 'confirm',
          name: 'isContinue',
          message: '当前目录不为空，创建项目将会清空原文件，是否继续？',
          default: false,
        }])).isContinue;
        if (!isContinue) {
          return;
        }
      }
      if (isContinue || this.force) {
        const { isForce } = await iq.prompt([{
          type: 'confirm',
          name: 'isForce',
          message: '清空当前目录下所有文件后不可恢复，是否继续？',
          default: false,
        }]);
        if (isForce) {
          fse.emptyDirSync(currentPath);
        } else {
          return;
        }
      }
    }
    return await this.getProjectInfo();
  }

  /**
   * 询问机制获取项目信息
   */
  async getProjectInfo() {
    let projectInfo = {};
    const { type } = await iq.prompt([{
      type: 'list',
      name: 'type',
      message: '请选择初始化类型',
      default: TYPE_PROJECT,
      choices: [
        {
          name: '项目',
          value: TYPE_PROJECT,
        },
        {
          name: '组件',
          value: TYPE_COMPONENT,
        },
      ],
    }]);
    this.template = this.template.filter(template => template.tag?.includes(type));
    if (type === TYPE_PROJECT) {
      const project = await iq.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: '请输入项目名称',
          default: this.projectName || 'my-project',
          validate: function (input) {
            const done = this.async();
            setTimeout(() => {
              if (/^[a-zA-Z]+([-|_][a-zA-Z]+)*[a-zA-Z]*$/.test(input)) {
                done(null, true);
              } else {
                done(colors.red('项目名称仅允许英文字符、“_”及“-”，不可以有连续的“_”或“-”，且开头与结尾必须为英文字符！'))
              }
            });
          }
        },
        {
          type: 'input',
          name: 'projectDescription',
          message: '请输入项目描述',
          default: 'my project',
        },
        {
          type: 'input',
          name: 'projectAuthor',
          message: '请输入项目作者',
          default: 'my-author',
        },
        {
          type: 'input',
          name: 'projectVersion',
          message: '请输入项目版本号',
          default: '1.0.0',
          validate: function (input) {
            const done = this.async();
            setTimeout(() => {
              if (semver.valid(input)) {
                done(null, true);
              } else {
                done(colors.red('项目版本号格式不正确，必须符合语义化版本号！'));
              }
            });
          },
          filter: function (input) {
            if (semver.valid(input)) {
              return semver.valid(input);
            } else {
              return input
            }
          }
        },
        {
          type: 'list',
          name: 'projectTemplate',
          message: '请选择项目模板',
          default: 0,
          choices: this.template.map((item, index) => {
            return {
              name: item.name,
              value: item.npmName,
            }
          })
        }
      ]);
      projectInfo = {
        type,
        ...project,
      }
    } else if (type === TYPE_COMPONENT) {
      const component = await iq.prompt([{
        type: 'input',
        name: 'name',
        message: '请输入组件名称',
        default: 'my-component',
      }]);
      projectInfo = {
        type,
        ...component,
      }
    }
    return projectInfo;
  }

  /**
   * 判断目录是否为空
   * @param {*} currentPath 所需判断路径
   * @returns 目录为空返回true，不为空返回false
   */
  isDirEmpty(currentPath) {
    let fileList = fs.readdirSync(currentPath);
    fileList = fileList.filter(file => !file.startsWith('.') && ['node_modules'].indexOf(file) < 0);
    return !fileList || fileList.length <= 0;
  }
}

// 命令入口函数
function init(cmdActionArgs) {
  return new InitCommand(cmdActionArgs);
}

exports.InitCommand = InitCommand;

module.exports = init;