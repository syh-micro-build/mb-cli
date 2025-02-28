import { writeFile, getPackageManager } from "@mb-cli/utils";
import axios from "axios";
import { exec } from "child_process";
import fs from "fs";

import HttpResult from "../common/httpResult";
import { scriptDescription } from "../common/static";

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

  async getProjectScript(path: string): Promise<HttpResult<any>> {
    try {
      const jsonData = this.getProjectPackageJson(path);
      const { scripts } = jsonData;
      const result = Object.keys(scripts)
        .filter(item => Object.keys(scriptDescription).includes(item))
        .map((item: any) => {
          const data =
            scriptDescription[item as keyof typeof scriptDescription];
          return {
            version: scripts[item],
            ...data
          };
        });
      return HttpResult.success(result);
    } catch (error) {
      console.log(error);
      return HttpResult.success("获取文件失败");
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

  async addProjectlDependent(data: {
    name: string;
    type: string;
    path: string;
    version: string;
  }): Promise<HttpResult<boolean | string>> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async resolve => {
      const { name, type, path, version } = data;
      const newPath = path + "/package.json";
      const jsonData = this.getProjectPackageJson(path);
      const dependencies = jsonData[type];
      dependencies[name] = version;
      const packageManager = this.getProjectPackageManager(path);
      await writeFile(newPath, JSON.stringify(jsonData, null, 2));
      exec(`cd ${path} && ${packageManager} install`, error => {
        if (error) {
          resolve(HttpResult.error(false));
        } else {
          resolve(HttpResult.success(true));
        }
      });
    });
  }

  async delProjectlDependent(data: {
    name: string;
    type: string;
    path: string;
  }): Promise<HttpResult<boolean | string>> {
    const { name, path } = data;
    return new Promise(resolve => {
      const packageManager = this.getProjectPackageManager(path);
      exec(
        `cd ${path} && ${packageManager} uninstall ${name}`,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (error, _stdout, _stderr) => {
          if (error) {
            resolve(HttpResult.error("删除依赖失败"));
          } else {
            resolve(HttpResult.success(true));
          }
        }
      );
    });
  }

  async updateProjectlDependent(data: {
    name: string;
    type: string;
    path: string;
    version: string;
  }): Promise<HttpResult<boolean | string>> {
    return new Promise(resolve => {
      const { name, type, path, version } = data;
      const _type = type === "dependencies" ? "" : "--save";
      const packageManager = this.getProjectPackageManager(path);
      console.log(
        `cd ${path} && ${packageManager} install ${name}@${version} ${_type}`
      );

      exec(
        `cd ${path} && ${packageManager} install ${name}@${version} ${_type}`,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (error, _stdout, _stderr) => {
          if (error) {
            resolve(HttpResult.error(false));
          } else {
            resolve(HttpResult.success(true));
          }
        }
      );
    });
  }

  getProjectPackageManager(path: string): string {
    const result = getPackageManager(path);
    if (typeof result === "string") {
      return result;
    }
    throw new Error("检测包管理工具失败 error");
  }
}

export default new ProjectService();
