const request = require('@mb-cli/request');

module.exports = function () {
  return request({
    url: 'project/template',
    method: 'GET',
  })
}