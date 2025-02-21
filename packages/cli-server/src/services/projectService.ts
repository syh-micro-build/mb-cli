import fs from "fs";

import HttpResult from "../common/httpResult";

class ProjectService {
  async getDependentList(path: string): Promise<HttpResult<any>> {
    try {
      const newPath = path + "/package.json";
      // 判断文件是否存在
      if (fs.existsSync(newPath)) {
        // 读取文件内容
        const data = fs.readFileSync(newPath, "utf8");
        // 解析JSON内容
        const jsonData = JSON.parse(data);
        const { dependencies, devDependencies } = jsonData;
        const result = {
          dependencies: Object.keys(dependencies).map(item => ({
            name: item,
            version: dependencies[item]
          })),
          devDependencies: Object.keys(devDependencies).map(item => ({
            name: item,
            version: devDependencies[item]
          }))
        };
        return HttpResult.success(result);
      }
      return HttpResult.error("获取文件配置失败");
    } catch (error) {
      console.log(error);
      return HttpResult.success("获取文件失败");
    }
  }
}

export default new ProjectService();
