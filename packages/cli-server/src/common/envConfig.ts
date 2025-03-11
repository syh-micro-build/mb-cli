import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const getEnv = (): dotenv.DotenvParseOutput => {
  const NODE_ENV = process.env.NODE_ENV || "development";
  // 获取当前模块的文件路径
  const __filename = fileURLToPath(import.meta.url);
  // 获取当前模块的目录路径
  const __dirname = dirname(__filename);

  const result = dotenv.config({
    path:
      NODE_ENV === "development"
        ? path.resolve(`env/development.env`)
        : path.resolve(__dirname, `../env/.${NODE_ENV}.env`)
  });

  return result?.parsed || {};
};
