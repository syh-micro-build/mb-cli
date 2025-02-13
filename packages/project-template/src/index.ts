import vue from "../template/vue/index";

import path from "path";
import { packageDirectory } from "pkg-dir";

import react from "../template/react/index";

/**
 * 异步获取项目类型数组
 *
 * 该函数通过扫描指定目录下的所有子目录，来获取项目类型数组
 * 这种方法用于动态获取项目类型，以便在运行时根据目录结构的变化进行适应
 *
 * @returns {Promise<string[]>} 返回一个Promise，解析为项目类型字符串数组
 */
export const getProjectType = async (): Promise<string[]> => {
  const globby = require("globby");
  const rootDir = (await packageDirectory()) as string;
  // 获取当前文件所在目录的路径
  const dir = path.join(rootDir, "./template");

  // 使用globby模块异步获取指定目录下的所有子目录名称
  // 这里配置了只获取目录，并指定了当前工作目录为dir
  const types = await globby(["*"], { onlyDirectories: true, cwd: dir });

  return types;
};

/**
 * 异步获取指定类型的模板名称列表。
 *
 * 该函数使用 globby 库匹配目录路径，并使用 path 库操作文件路径。
 * 首先根据 type 参数构建目标目录的路径，然后异步获取该目录下的所有子目录名称，
 * 最终返回这些名称作为字符串数组。
 *
 * @param type 模板类型，用于定位对应的目录。
 * @returns 返回一个 Promise，解析为模板名称的字符串数组。
 */
export const getTemplateNames = async (type: string): Promise<string[]> => {
  const globby = require("globby");
  // 获取当前目录的路径
  const rootDir = (await packageDirectory()) as string;
  // 获取当前文件所在目录的路径
  const dir = path.join(rootDir, "./template");

  // 使用 globby 库异步获取指定类型的所有子目录路径
  const paths = await globby([`${type}/*`], {
    onlyDirectories: true,
    cwd: dir
  });

  // 将每个子目录路径转换为模板名称
  const templateNames = paths.map((subFolderPath: string) =>
    path.basename(subFolderPath)
  );

  // 返回模板名称数组
  return templateNames;
};

/**
 * 异步获取项目类型的模板映射
 *
 * 此函数创建并返回一个Map对象，该对象将项目类型映射到其相应的模板名称数组
 * 它通过获取项目类型，然后为每种类型获取其模板名称，并将这些信息存储在Map中来实现这一点
 *
 * @returns {Promise<Map<string, string[]>>} 返回一个Promise，解析为一个Map，其中键是项目类型，值是模板名称数组
 */
export const getTemplateMap = async (): Promise<Map<string, string[]>> => {
  // 获取项目类型列表
  const types = await getProjectType();
  // 初始化模板映射Map
  const templatesMap = new Map<string, string[]>();
  // 存储当前目录下的第一层文件夹名称及其二级目录
  for (const folderPath of types) {
    // 提取文件夹名称作为项目类型
    const type = path.basename(folderPath);

    // 获取当前项目类型的所有模板名称
    const templateNames = await getTemplateNames(type);

    // 将项目类型和其模板名称数组添加到Map中
    templatesMap.set(type, templateNames);
  }

  // 返回构建好的模板映射Map
  return templatesMap;
};

/**
 * 初始化渲染模板
 * @param api
 * @returns Promise<void>
 */
export const onInit = async (api: any): Promise<void> => {
  if (api.baseOptions.templateType === "vue") {
    await vue.onInit(api);
  } else if (api.baseOptions.templateType === "react") {
    await react.onInit(api);
  } else {
    console.log("项目类型错误");
  }
};
