import { createServer } from "http";
import { Server } from "socket.io";

import router from "./router";

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
  // 创建HTTP服务器
  const httpServer = createServer();

  // 创建Socket.IO服务器实例，传入HTTP服务器实例和配置选项
  const io = new Server(httpServer, {
    /* options */
  });

  // 监听Socket.IO的连接事件
  io.on("connection", socket => {
    // 当有客户端连接时，调用router函数处理连接
    router(io, socket);
  });

  // 监听HTTP服务器的3000端口，并在成功启动时调用提供的成功回调函数（如果有）
  httpServer.listen(3000, (): void => {
    if (data?.successCallback) {
      data.successCallback();
    }
    console.log("Server is running on port 3000");
  });
};

startServer();
