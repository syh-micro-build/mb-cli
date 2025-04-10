import { Server, Socket } from "socket.io";

import { ON_EVENT_ENUM } from "../enum/index";
import SocketService from "../services/socketService";
import { createProjectInterface } from "../types/index";

export default (_io: Server, socket: Socket): void => {
  /**
   * @swagger
   * /onInitProject:
   *   post:
   *     tags:
   *       - websocket
   *     summary: "socket.io 创建项目"
   *     description: 返回项目类型+模版名称
   *     content:
   *       application/json:
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            type: object
   *            required:
   *              - projectType
   *              - projectName
   *              - templateName
   *              - path
   *              - packageManager
   *            properties:
   *              projectType:
   *                type: string
   *                default: 项目类型
   *              projectName:
   *                type: string
   *                default: 项目名称
   *              templateName:
   *                type: string
   *                default: 模版名称
   *              path:
   *                type: string
   *                default: 路径
   *              packageManager:
   *                type: string
   *                default: 包管理工具 npm | yarn | pnpm
   */
  socket.on(
    ON_EVENT_ENUM.ON_INIT_PROJECT_ENUM,
    (data: createProjectInterface) => SocketService.onInitProject(data, socket)
  );

  /**
   * @swagger
   * /onExecuteShell:
   *   post:
   *     tags:
   *       - websocket
   *     summary: "socket.io 执行shell 脚本"
   *     description: 监听shell 脚本
   *     content:
   *       application/json:
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            type: object
   *            required:
   *              - path
   *            properties:
   *              path:
   *                type: string
   *                default: 所执行的shell 脚本
   */
  socket.on(ON_EVENT_ENUM.ON_EXECUTE_SHELL, (data: { path: string }) =>
    SocketService.executeShell(data.path, socket)
  );
};
