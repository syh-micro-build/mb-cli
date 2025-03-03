import { initProject } from "@mb-cli/cli";
import { checkNodeVersion, checkNpmVersion } from "@mb-cli/utils";
import { exec } from "child_process";
import { Socket } from "socket.io";

import HttpResult from "../common/httpResult";
import { EMIT_ENUM, ON_EVENT_ENUM } from "../enum";
import { createProjectInterface } from "../types";

class TemplateService {
  async onInitProject(
    data: createProjectInterface,
    socket: Socket
  ): Promise<void> {
    const generator = await initProject({
      projectType: data.projectType,
      name: data.projectName,
      templateName: data.templateName,
      baseUrl: data.path
    });
    const packageJson = generator.pkg;
    const requiredNodeVersion = packageJson.engines?.node;
    const requiredNpmVersion = packageJson.engines?.npm;

    generator.baseOptions.packageManager = data.packageManager;

    if (requiredNodeVersion) {
      const result = checkNodeVersion(requiredNodeVersion);
      if (!result) {
        socket.emit(ON_EVENT_ENUM.ON_ERROR, HttpResult.error("node版本不匹配"));
        return;
      }
    }

    if (requiredNpmVersion) {
      const result = checkNpmVersion(requiredNpmVersion);
      if (!result) {
        socket.emit(ON_EVENT_ENUM.ON_ERROR, HttpResult.error("npm版本不匹配"));
        return;
      }
    }
    generator.render({
      onRenderProgress: (progress: number, t: number) => {
        socket.emit(EMIT_ENUM.ON_PROGRESS, { progress, total: t });
      },
      onRenderEnd: () => {
        const base = `${generator.baseOptions.baseUrl}/${generator.baseOptions.projectName}`;
        socket.emit(EMIT_ENUM.ON_INSTALL, { type: "start" });
        exec(
          `cd ${base} && ${generator.baseOptions.packageManager} install`,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (error, _stdout, _stderr) => {
            if (error) {
              socket.emit(EMIT_ENUM.ON_INSTALL, { type: "error" });
            } else {
              socket.emit(EMIT_ENUM.ON_INSTALL, { type: "success" });
            }
          }
        );
      }
    });
  }

  executeShell(sheell: string, socket: Socket): void {
    const cmd = exec(sheell);
    if (!cmd) {
      return;
    }
    cmd.stdout?.on("data", data => {
      // 实时推送标准输出
      socket.emit(EMIT_ENUM.ON_SHELL_OUT_PUT, data);
    });

    cmd.stderr?.on("data", data => {
      // 实时推送标准错误
      socket.emit(EMIT_ENUM.ON_SHELL_OUT_PUT_ERROR, `Error: ${data}`);
    });

    cmd.on("close", code => {
      console.log(`Command exited with code ${code}`);
      socket.emit(
        EMIT_ENUM.ON_SHELL_OUT_PUT,
        `Command exited with code ${code}`
      );
    });
  }
}

export default new TemplateService();
