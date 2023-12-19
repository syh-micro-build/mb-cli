'use strict';

const fs = require('fs');

const iq = require('inquirer');
const fse = require('fs-extra');
const colors = require('colors');
const semver = require('semver');

const Command = require('@mb-cli/command');
const log = require('@mb-cli/log');

const TYPE_PROJECT = 'project';
const TYPE_COMPONENT = 'component';

class InitCommand extends Command {
  init() {
    this.projectName = this._argv[0] || '';
    this.force = this._argv[1].force || false;
    log.verbose('projectName', this.projectName);
    log.verbose('force', this.force);
  }

  async exec() {
    try {
      const ready = await this.prepare();
      if (ready) {
        
      }
    } catch (error) {
      log.error(error.message);
    }
  }

  async prepare() {
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
        }
      }
    }
    return await this.getProjectInfo();
  }

  async getProjectInfo() {
    const projectInfo = {};
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
    if (type === TYPE_PROJECT) {
      const o = await iq.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: '请输入项目名称',
          default: 'my-project',
          validate: function(input) {
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
          validate: function(input) {
            const done = this.async();
            setTimeout(() => {
              if (semver.valid(input)) {
                done(null, true);
              } else {
                done(colors.red('项目版本号格式不正确，必须符合语义化版本号！'));
              }
            });
          },
          filter: function(input) {
            if(semver.valid(input)) {
              return semver.valid(input);
            } else {
              return input
            }
          }
        },
      ]);
    } else if (type === TYPE_COMPONENT) {
      const { name } = await iq.prompt([{
        type: 'input',
        name: 'name',
        message: '请输入组件名称',
        default: 'my-component',
      }]);
      log.verbose('name', name);
      projectInfo.name = name;
    }
  }

  isDirEmpty(currentPath) {
    let fileList = fs.readdirSync(currentPath);
    fileList = fileList.filter(file => !file.startsWith('.') && ['node_modules'].indexOf(file) < 0);
    return !fileList || fileList.length <= 0;
  }
}

function init(cmdActionArgs) {
  return new InitCommand(cmdActionArgs);
}

exports.InitCommand = InitCommand;

module.exports = init;