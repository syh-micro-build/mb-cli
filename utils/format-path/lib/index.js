'use strict';

const path = require('path');

/**
 * 路径兼容（MacOS/Windows）
 * @param {string} p 路径
 * @returns 兼容路径
 */
function formatPath(p) {
  if (p && typeof p === 'string') {
    const sep = path.sep;
    if (sep === '/') {
      return p;
    } else {
      return p.replace(/\\/g, '/');
    }
  }
  return p;
}

module.exports = formatPath;