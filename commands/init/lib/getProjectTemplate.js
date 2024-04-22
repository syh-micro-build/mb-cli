const request = require('@mb-cli/request');

/**
 * 获取项目模板列表
 * @returns {Promise<AxiosResponse<any>>}
 */
module.exports = function () {
  return request({
    url: 'project/template',
    method: 'GET',
  })
}