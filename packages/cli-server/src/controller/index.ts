import { initProject } from "@mb-cli/cli";
import { checkNodeVersion, checkNpmVersion } from "@mb-cli/utils";
import { Server, Socket } from "socket.io";

import HttpResult from "../common/httpResult";
import { ON_EVENT_ENUM } from "../enum/index";
import { createProjectInterface } from "../types/index";

const onInitProject = async (
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

  if (requiredNodeVersion) {
    const result = checkNodeVersion(requiredNodeVersion);
    if (!result) {
      socket.send(HttpResult.error("node版本不匹配"));
      return;
    }
  }

  if (requiredNpmVersion) {
    const result = checkNpmVersion(requiredNpmVersion);
    if (!result) {
      socket.send(HttpResult.error("npm版本不匹配"));
      return;
    }
  }
  generator.render({
    onRenderProgress: (progress: number, t: number) => {
      console.log("progress", progress, t);
    },
    onRenderEnd: () => {
      console.log("onRenderEnd");
      socket.send(HttpResult.success("项目创建成功"));
    }
  });
};

export default (_io: Server, socket: Socket): void => {
  // 初始化项目
  socket.on(
    ON_EVENT_ENUM.ON_INIT_PROJECT_ENUM,
    (data: createProjectInterface) => onInitProject(data, socket)
  );
};
