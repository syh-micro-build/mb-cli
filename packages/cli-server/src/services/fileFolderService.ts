import fs from "fs";

import HttpResult from "../common/httpResult";

class FileFolderService {
  async getAllFile(path: string): Promise<HttpResult<any>> {
    try {
      const files = fs.readdirSync(path);
      const result = files.map(item => {
        const isDir = fs.statSync(path + "/" + item).isDirectory();
        return {
          name: item,
          path: path + "/" + item,
          isDir
        };
      });
      return HttpResult.success(result);
    } catch (error) {
      console.log(error);
      return HttpResult.success("获取文件失败");
    }
  }
}

export default new FileFolderService();
