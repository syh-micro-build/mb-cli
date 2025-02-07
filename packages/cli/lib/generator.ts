import { writeFile } from "@mb-cli/utils/lib/index";
import { merge } from "lodash";

export type ComuseType = boolean | string | number | undefined;

export interface PackageType {
  engines?: {
    node?: string;
    npm?: string;
  };
  [string: string]: ComuseType | PackageType | object;
}

/**
 * 默认项目名称
 */
export const defaultProjectName = "my-project";

/**
 * 默认模板类型
 */
export const defaultTemplateType = "vue";

export interface RenderCallback {
  /**
   * 渲染开始回调
   */
  onRenderStart?: () => void;
  /**
   * 渲染进度回调
   * @param progress 进度
   * @param tools 总数量
   */
  onRenderProgress?: (progress: number, tools: number) => void;

  /**
   * 渲染结束回调
   */
  onRenderEnd?: () => void;

  /**
   * 渲染babel回调
   */
  onRenderBabel?: () => void;
}

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
 * 生成器类
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
  pkg: PackageType = {};

  /**
   * 获取package.json
   * @returns package.json
   */
  private getPackageJson(): PackageType {
    return merge(
      {
        name: this.baseOptions.projectName,
        version: "0.0.0",
        description: "",
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
  async render(callback: RenderCallback): Promise<void> {
    // 调用渲染开始回调（如果有）
    if (callback.onRenderStart) {
      callback.onRenderStart();
    }

    const base = `${this.baseOptions.baseUrl}/${this.baseOptions.projectName}`;

    // 渲染模板
    const filePaths = Array.from(this.templateAllPath.keys());
    // 静态数据
    const babelList = [
      {
        filePath: `${base}/package.json`,
        content: JSON.stringify(this.getPackageJson(), null, 2)
      }
    ];

    for (const [index, filePath] of filePaths.entries()) {
      const content = this.templateAllPath.get(filePath);
      await writeFile(`${base}/${filePath}`, content);
      if (callback.onRenderProgress) {
        callback.onRenderProgress(index + 1, filePaths.length);
      }
    }

    if (callback.onRenderBabel) {
      callback.onRenderBabel();
    }

    for (const item of babelList) {
      await writeFile(item.filePath, item.content);
    }

    // 调用渲染结束回调（如果有）
    if (callback.onRenderEnd) {
      callback.onRenderEnd();
    }
  }
}

export const generator = new GeneratorClass();
