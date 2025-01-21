import { writeFile } from "@mb-cli/utils/lib/index";
import { merge } from "lodash";

/**
 * 默认项目名称
 */
export const defaultProjectName = "my-project";

/**
 * 默认模板类型
 */
export const defaultTemplateType = "vue";

export interface BaseOptions {
  /**
   * 项目名称
   */
  projectName: string;

  /**
   * 项目类型
   */
  templateType: string;

  /**
   * 项目baseUrl
   */
  baseUrl: string;
}

/**
 * 生成器
 */
export class GeneratorClass {
  baseOptions: BaseOptions = {
    projectName: defaultProjectName,
    templateType: defaultTemplateType,
    baseUrl: process.cwd()
  };

  /**
   * @param templateName 模板名称
   */
  templateName: string = "";

  /**
   * @param templateAllPath 模板路径
   */
  templateAllPath: Map<string, string | Buffer> = new Map<
    string,
    string | Buffer
  >();

  /**
   * @param pkg package.json
   */
  pkg: Record<string, object> = {};

  /**
   * 获取package.json
   * @returns package.json
   */
  private getPackageJson(): Record<string, object | string> {
    return merge(
      {
        name: this.baseOptions.projectName,
        version: "0.0.0",
        description: "",
        main: "index.js",
        scripts: {
          dev: "vite",
          build: "vite build",
          serve: "vite preview"
        },
        dependencies: {},
        devDependencies: {}
      },
      this.pkg,
      {}
    );
  }

  /**
   * 渲染模板
   */
  render(): void {
    const base = `${this.baseOptions.baseUrl}/${this.baseOptions.projectName}`;

    // 渲染模板
    const filePaths = this.templateAllPath.keys();

    for (const filePath of filePaths) {
      writeFile(`${base}/${filePath}`, this.templateAllPath.get(filePath));
    }

    // 生成package.json
    writeFile(
      `${base}/package.json`,
      JSON.stringify(this.getPackageJson(), null, 2)
    );
  }
}

export const generator = new GeneratorClass();
