'use strict';

const Command = require('@mb-cli/command');
const log = require('@mb-cli/log');

class InitCommand extends Command {
  init() {
    this.projectName = this._argv[0] || '';
    this.force = this._argv[1].force || false;
    log.verbose('projectName', this.projectName);
    log.verbose('force', this.force);
  }

  exec() {
    
  }
}

function init(projectName, commandOpts, commandObj) {
  console.log('init',projectName, commandOpts, commandObj.parent.opts(), process.env.CLI_TARGET_PATH);
  return new InitCommand(arguments);
}

exports.InitCommand = InitCommand;

module.exports = init;