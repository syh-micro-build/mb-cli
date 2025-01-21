import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import validateProjectName from "validate-npm-package-name";

import { generator } from "./generator";

/**
 * 创建项目
 * @param {string} projectName - 项目名称
 * @returns {Promise<void>}
 */
const create = async (
  projectName: string = generator.baseOptions.projectName
): Promise<void> => {
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
};

export default create;
