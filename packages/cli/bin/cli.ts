import chalk from "chalk";
import { program } from "commander";

import create from "../lib/create";

program
  .version(`@mb-cli/cli ${require("../package.json").version}`)
  .usage("<command> [options]");

program
  .command("create [app-name]")
  .description("创建项目")
  .action((name: string) => {
    create(name);
  });

program
  .command("ui")
  .description("启动可视化ui 窗口")
  .action(() => {
    require("../lib/ui");
  });

program.on("command:*", ([cmd]) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  process.exitCode = 1;
});

program.on("--help", () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(
      `mb-cli <command> --help`
    )} for detailed usage of given command.`
  );
  console.log();
});

program.parse(process.argv);
