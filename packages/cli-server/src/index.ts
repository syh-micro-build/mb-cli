import express from "express";
import { createServer } from "http";
import path, { dirname } from "path";
import { Server } from "socket.io";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";

import socketServers from "./controller/socketController";
import { routes } from "./router";

const app = express();
// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块的目录路径
const __dirname = dirname(__filename);
// Swagger配置
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // 或 'swagger: '2.0'，根据你选择的Swagger版本
    info: {
      title: "Mb-build API",
      version: "1.0.0",
      description: "API documentation with Swagger"
    }
  },
  // 这里是扫描你的TypeScript文件的路径，使用 `**/*.ts` 以确保 TypeScript 文件被正确扫描
  apis: [
    path.join(__dirname, "./router/*.ts"),
    path.join(__dirname, "./controller/*.ts")
  ]
};

/**
 * 启动服务器的异步函数
 *
 * 此函数创建并启动一个HTTP服务器，同时配置Socket.IO以支持WebSocket连接
 * 它接受一个可选的成功回调函数，当服务器成功启动时会调用该函数
 *
 * @param data - 包含成功回调函数的对象
 * @param data.successCallback - 服务器成功启动时调用的回调函数
 * @returns 无返回值
 */
export const startServer = async (data?: {
  successCallback?: () => void;
}): Promise<void> => {
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.use(express.json());
  routes(app);
  const httpServer = createServer(app);

  // 创建Socket.IO服务器实例，传入HTTP服务器实例和配置选项
  const io = new Server(httpServer, {
    /* options */
  });

  // 监听Socket.IO的连接事件
  io.on("connection", socket => {
    // 当有客户端连接时，调用router函数处理连接
    socketServers(io, socket);
  });

  // 监听HTTP服务器的3000端口，并在成功启动时调用提供的成功回调函数（如果有）
  httpServer.listen(3000, (): void => {
    if (data?.successCallback) {
      data.successCallback();
    }
    console.log("Server is running on host: http://127.0.0.1:3000");
  });
};

startServer();
