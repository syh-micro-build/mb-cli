'use strict';

const log = require('npmlog')

process.env.LOG_LEVEL && (log.level = process.env.LOG_LEVEL);
log.heading = 'MB';
log.headingStyle = { fg: 'red', bg: 'white' };
log.addLevel('success', 2000, {fg: 'green', bold: true});

module.exports = log;