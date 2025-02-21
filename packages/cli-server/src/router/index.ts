import { Application } from "express";

import fileFolderController from "../controller/fileFolderController";
import templateController from "../controller/templateController";

/**
 * @swagger
 * tags:
 *   - name: template
 *     description: 模版相关api
 *   - name: fileFolder
 *     description: 文件相关接口
 *   - name: websocket
 *     description: socket.io 相关api (post 表示发送事件名称 get 表示监听事件名称)
 */

export const routes = (app: Application): void => {
  app.use("/template", templateController);
  app.use("/fileFolder", fileFolderController);
};
