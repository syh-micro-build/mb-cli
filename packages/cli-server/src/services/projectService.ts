import { writeFile } from "@mb-cli/utils";
import axios from "axios";
import fs from "fs";

import HttpResult from "../common/httpResult";

class ProjectService {
  getProjectPackageJson(path: string): any {
    try {
      const newPath = path + "/package.json";
      // 判断文件是否存在
      if (fs.existsSync(newPath)) {
        // 读取文件内容
        const data = fs.readFileSync(newPath, "utf8");
        // 解析JSON内容
        const jsonData = JSON.parse(data);
        // 返回解析后的JSON数据
        return jsonData;
      }
    } catch {
      // 如果发生错误，返回错误信息
      throw HttpResult.error("读取文件内容失败");
    }
  }

  async getDependentList(path: string): Promise<HttpResult<any>> {
    try {
      const jsonData = this.getProjectPackageJson(path);
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
    } catch (error) {
      console.log(error);
      return HttpResult.success("获取文件失败");
    }
  }

  async searchHttpDependentList(data: {
    page: number;
    pageSize: number;
    text: string;
  }): Promise<HttpResult<any>> {
    const { page, text, pageSize } = data;
    const result = await axios.get(
      `https://registry.npmjs.org/-/v1/search?text=${text}&size=${pageSize}&from=${page - 1}`
    );
    const { objects, total } = result.data;
    return HttpResult.success({
      list: objects,
      total
    });
  }

  async getHttpDependentDetails(data: {
    text: string;
  }): Promise<HttpResult<any>> {
    const { text } = data;
    const result = await axios.get(`https://registry.npmjs.org/${text}`);
    return HttpResult.success(result.data);
  }

  async delProjectlDependent(data: {
    name: string;
    type: string;
    path: string;
  }): Promise<HttpResult<boolean | string>> {
    const { name, type, path } = data;
    try {
      const newPath = path + "/package.json";
      const jsonData = this.getProjectPackageJson(path);
      const dependencies = jsonData[type];
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete dependencies[name];
      await writeFile(newPath, JSON.stringify(jsonData, null, 2));
      return HttpResult.success(true);
    } catch (error) {
      console.log(error);
      return HttpResult.success("获取文件失败");
    }
  }

  async updateProjectlDependent(data: {
    name: string;
    type: string;
    path: string;
    version: string;
  }): Promise<HttpResult<boolean | string>> {
    try {
      const { name, type, path, version } = data;
      const newPath = path + "/package.json";
      const jsonData = this.getProjectPackageJson(path);
      const dependencies = jsonData[type];
      dependencies[name] = version;
      await writeFile(newPath, JSON.stringify(jsonData, null, 2));
      return HttpResult.success(true);
    } catch (error) {
      console.log(error);
      return HttpResult.success("更新依赖失败");
    }
  }
}

export default new ProjectService();
