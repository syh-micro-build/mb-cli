import { getTemplateMap } from "@mb-cli/project-template";
import chalk from "chalk";

const initTel = async (): Promise<void> => {
  const templatesMap = await getTemplateMap();
  console.log("\n\n加载模版完成:");
  templatesMap.forEach((subFolders, folderName) => {
    console.log(`\n项目类型: ${chalk.green(folderName)}`);
    console.log("模版名称:");
    subFolders.forEach(subFolder => {
      console.log(`  - ${chalk.green(subFolder)}`);
    });
  });
};

export default initTel;
