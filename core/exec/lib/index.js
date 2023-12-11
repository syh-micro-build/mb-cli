'use strict';

const path = require('path');

const Package = require('@mb-cli/Package');
const log = require('@mb-cli/log');

const SETTINGS = {
  init: '@mb-cli/init'
}

const CACHE_DIR = 'dependencies';

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
  rootFile && require(rootFile)(...arguments);
}

module.exports = exec;