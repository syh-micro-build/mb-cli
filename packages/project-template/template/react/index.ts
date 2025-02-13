import { renderFile, getDirAllFiles } from "@mb-cli/utils";
import path from "path";

import { GeneratorRenderTemplate } from "../../src/common/GeneratorRenderTemplate";

class GeneratorReact extends GeneratorRenderTemplate {
  /**
   * 设置模板函数
   * 该函数负责将指定模板类型的模板文件全部加载并渲染
   *
   * @param api GeneratorClass实例，包含模板类型和项目基础选项
   * @returns Promise<void> 无返回值
   */
  setTemplate = async (api: any): Promise<void> => {
    const pkgDir = require("pkg-dir");
    const rootDir = await pkgDir(__dirname);
    // 获取当前文件所在目录的路径
    const dir = path.join(
      rootDir,
      `./template/${api.baseOptions.templateType}/${api.templateName}`
    );

    // 获取模板目录下所有文件的路径
    const result = await getDirAllFiles(dir);

    // 遍历所有文件路径
    for (const _path of result) {
      // 构建文件的绝对路径
      const filePath = path.resolve(dir, _path);
      // 将文件路径和渲染后的文件内容添加到模板路径集合中
      api.templateAllPath.set(
        _path,
        renderFile(filePath, {
          projectType: api.baseOptions.templateType,
          projectName: api.baseOptions.projectName
        })
      );
    }
  };

  onInit = async (api: any): Promise<void> => {
    await this.setTemplate(api);
    api.pkg = {
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1"
      },
      devDependencies: {
        "@eslint/js": "^9.17.0",
        "@types/react": "^18.3.18",
        "@types/react-dom": "^18.3.5",
        "@vitejs/plugin-react": "^4.3.4",
        eslint: "^9.17.0",
        "eslint-plugin-react-hooks": "^5.0.0",
        "eslint-plugin-react-refresh": "^0.4.16",
        globals: "^15.14.0",
        typescript: "~5.6.2",
        "typescript-eslint": "^8.18.2",
        vite: "^6.0.5"
      }
    };
  };
}

export default new GeneratorReact();
