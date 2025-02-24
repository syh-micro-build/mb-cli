import { initProject } from "@mb-cli/cli";
import { checkNodeVersion, checkNpmVersion } from "@mb-cli/utils";
import { exec } from "child_process";
import { Socket } from "socket.io";

import HttpResult from "../common/httpResult";
import { ON_EVENT_ENUM } from "../enum";
import { createProjectInterface } from "../types";

class TemplateService {
  onInitProject = async (
    data: createProjectInterface,
    socket: Socket
  ): Promise<void> => {
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
        socket.emit(ON_EVENT_ENUM.ON_PROGRESS, { progress, total: t });
      },
      onRenderEnd: () => {
        const base = `${generator.baseOptions.baseUrl}/${generator.baseOptions.projectName}`;
        socket.emit(ON_EVENT_ENUM.ON_INSTALL, { type: "start" });
        exec(
          `cd ${base} && ${generator.baseOptions.packageManager} install`,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (error, _stdout, _stderr) => {
            if (error) {
              socket.emit(ON_EVENT_ENUM.ON_INSTALL, { type: "error" });
            } else {
              socket.emit(ON_EVENT_ENUM.ON_INSTALL, { type: "success" });
            }
          }
        );
      }
    });
  };
}

export default new TemplateService();
