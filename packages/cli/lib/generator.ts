import { sortObject, writeFile } from "@mb-cli/utils";
import { merge } from "lodash-es";

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

  /**
   * 包管理器
   */
  packageManager: "npm" | "yarn" | "pnpm";
}

/**
 * 生成器类
 */
export class GeneratorClass {
  private baseOptions: BaseOptions = {
    projectName: defaultProjectName,
    templateType: defaultTemplateType,
    packageManager: "npm",
    baseUrl: process.cwd()
  };

  /**
   * @param templateName 模板名称
   */
  private templateName: string = "";

  /**
   * @param templateAllPath 模板路径
   */
  private templateAllPath: Map<string, string | Buffer> = new Map<
    string,
    string | Buffer
  >();

  /**
   * @param pkg package.json
   */
  private pkg: PackageType = {};

  /**
   * 设置基本配置
   * @param baseOptions 基本配置
   */
  setBaseOptions = (baseOptions: BaseOptions): void => {
    this.baseOptions = baseOptions;
  };

  /**
   * 设置模板路径
   * @param templateAllPath 模板路径
   */
  setTemplateAllPath = (
    templateAllPath: Map<string, string | Buffer>
  ): void => {
    this.templateAllPath = templateAllPath;
  };

  /**
   * 设置模板名称
   * @param templateName 模板名称
   */
  setTemplateName(templateName: string): void {
    this.templateName = templateName;
  }

  /**
   * 设置package.json
   * @param pkg package.json
   */
  setPackageJson: (pkg: PackageType) => void = (pkg: PackageType) => {
    this.pkg = pkg;
  };

  /**
   * 获取package.json
   * @returns package.json
   */
  getPackageJson(): PackageType {
    return sortObject(
      merge(
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
      ),
      [
        "name",
        "version",
        "private",
        "type",
        "description",
        "author",
        "scripts",
        "main",
        "module",
        "browser",
        "jsDelivr",
        "unpkg",
        "files",
        "dependencies",
        "devDependencies",
        "peerDependencies",
        "vue",
        "babel",
        "eslintConfig",
        "prettier",
        "postcss",
        "browserslist",
        "jest"
      ]
    );
  }

  /**
   * 获取模板名称
   * @returns 模板名称
   */
  getTemplateName(): string {
    return this.templateName;
  }

  /**
   * 获取模板路径
   * @returns 模板路径
   */
  getTemplateAllPath(): Map<string, string | Buffer> {
    return this.templateAllPath;
  }

  /**
   * 获取基本配置
   * @returns 基本配置
   */
  getBaseOptions(): BaseOptions {
    return this.baseOptions;
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
