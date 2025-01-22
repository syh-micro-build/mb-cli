import {
  getProjectType,
  getTemplateNames,
  onInit
} from "@mb-cli/project-template";
import { getCliProgress } from "@mb-cli/utils/lib";
import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import validateProjectName from "validate-npm-package-name";

import { generator } from "./generator";

const bar1 = getCliProgress();
/**
 * 创建模版
 * @param options
 */

export const createTemplate = async (options: {
  name: string;
  projectType: "vue" | "react";
  templateName: string;
  baseUrl?: string;
}): Promise<void> => {
  generator.baseOptions.projectName = options.name;
  generator.baseOptions.templateType = options.projectType;
  generator.templateName = options.templateName;
  if (options.baseUrl) {
    generator.baseOptions.baseUrl = options.baseUrl;
  }
  await onInit(generator);
  generator.render({
    onRenderStart: () => {
      console.log(
        chalk.green(`开始创建项目: ${generator.baseOptions.projectName}`)
      );
    },
    onRenderProgress: (progress: number, t: number) => {
      if (progress === 1) {
        bar1.start(t, 1, {
          speed: "N/A"
        });
        return;
      }
      bar1.update(progress);
      if (progress === t) {
        bar1.stop();
      }
    },
    onRenderEnd: () => {
      console.log(
        chalk.green(`项目创建成功: ${generator.baseOptions.projectName}`)
      );
    }
  });
};

/**
 * 创建项目
 * @param {string} projectName - 项目名称
 * @returns {Promise<void>}
 */
const create = async (_projectName: string): Promise<void> => {
  let projectName = _projectName;
  if (!_projectName) {
    const { name } = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "请输入项目名称:",
        default: generator.baseOptions.projectName
      }
    ]);
    projectName = name;
  }

  const result = validateProjectName(projectName);
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`));
    result.errors &&
      result.errors.forEach((err: string) => {
        console.error(chalk.red.dim("Error: " + err));
      });
    result.warnings &&
      result.warnings.forEach((warn: string) => {
        console.error(chalk.red.dim("Warning: " + warn));
      });
    process.exit(1);
  }

  const cwd = generator.baseOptions.baseUrl;
  generator.baseOptions.projectName = projectName;

  const targetDir = path.resolve(cwd, projectName || ".");
  if (fs.existsSync(targetDir)) {
    fs.removeSync(targetDir);
  }

  const types = await getProjectType();
  const { projectType } = await inquirer.prompt([
    {
      name: "projectType",
      type: "list",
      message: "请选择创建项目类型",
      choices: types.map(type => ({ name: type, value: type }))
    }
  ]);

  const templates = await getTemplateNames(projectType);
  const { templateChoice } = await inquirer.prompt([
    {
      name: "templateChoice",
      type: "list",
      message: "请选择模版类型",
      choices: templates.map(template => ({ name: template, value: template }))
    }
  ]);

  createTemplate({
    name: projectName,
    projectType,
    templateName: templateChoice
  });
};

export default create;
