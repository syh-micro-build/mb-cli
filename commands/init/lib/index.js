'use strict';


function init(projectName, commandObj, cmdObj) {
  console.log('init',projectName, commandObj, cmdObj.parent.opts(), process.env.CLI_TARGET_PATH);
  return 'Hello from init';
}

module.exports = init;