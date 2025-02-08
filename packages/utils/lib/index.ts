import colors from "ansi-colors";
import { execSync } from "child_process";
import cliProgress from "cli-progress";
import ejs from "ejs";
import fs from "fs";
import { globby } from "globby";
import { isBinaryFileSync } from "isbinaryfile";
import path from "path";
import resolve from "resolve";
import semver from "semver";

const replaceBlock = /<%# REPLACE %>([\s\S]*?)<%# END_REPLACE %>/g;

/**
 * 读取文件
 * @param {string} name - 文件路径
 * @param {Record<string, any>} data ejs 模版date
 * @param {Record<string, any>} ejsOptions - ejs options
 * @returns {string | Buffer<ArrayBufferLike>} The rendered template
 */
export const renderFile = (
  name: string,
  data: Record<string, string | object> = {},
  ejsOptions: Record<string, string | object> = {}
): string | Buffer<ArrayBufferLike> => {
  if (isBinaryFileSync(name)) {
    return fs.readFileSync(name); // return buffer
  }
  const template = fs.readFileSync(name, "utf-8");

  // custom template inheritance via yaml front matter.
  // ---
  // extend: 'source-file'
  // replace: !!js/regexp /some-regex/
  // OR
  // replace:
  //   - !!js/regexp /foo/
  //   - !!js/regexp /bar/
  // ---
  const yaml = require("yaml-front-matter");
  const parsed = yaml.loadFront(template);
  const content = parsed.__content;
  let finalTemplate = content.trim() + `\n`;

  if (parsed.when) {
    finalTemplate =
      `<%_ if (${parsed.when}) { _%>` + finalTemplate + `<%_ } _%>`;

    const result = ejs.render(finalTemplate, data, ejsOptions);
    if (!result) {
      return "";
    }
  }

  if (parsed.extend) {
    const extendPath = path.isAbsolute(parsed.extend)
      ? parsed.extend
      : resolve.sync(parsed.extend, { basedir: path.dirname(name) });
    finalTemplate = fs.readFileSync(extendPath, "utf-8");
    if (parsed.replace) {
      if (Array.isArray(parsed.replace)) {
        const replaceMatch = content.match(replaceBlock);
        if (replaceMatch) {
          const replaces = replaceMatch.map((m: string) =>
            m.replace(replaceBlock, "$1").trim()
          );
          parsed.replace.forEach((r: string, i: string) => {
            finalTemplate = finalTemplate.replace(r, replaces[i]);
          });
        }
      } else {
        finalTemplate = finalTemplate.replace(parsed.replace, content.trim());
      }
    }
  }

  return ejs.render(finalTemplate, data, ejsOptions);
};

/**
 * 异步将内容写入指定文件路径的文件。
 * 如果文件所在的目录不存在，则递归创建该目录。
 * 如果内容为 undefined，则写入空字符串。
 *
 * @param filePath 要写入的文件路径。
 * @param content 要写入的内容，可以是字符串或 Buffer，如果为 undefined，则写入空字符串。
 * @returns 返回一个在写入操作完成时解析的 Promise。
 */
export const writeFile = async (
  filePath: string,
  content: string | Buffer<ArrayBufferLike> | undefined
): Promise<void> => {
  // 获取文件的目录路径
  const dir = path.dirname(filePath);
  // 检查目录是否存在，如果不存在则递归创建
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  // 将内容写入文件，如果内容为 undefined，则写入空字符串
  fs.writeFileSync(filePath, content || "", {
    encoding: "utf-8"
  });
};

/**
 * 异步获取目录下所有文件路径
 *
 * @param baseDir {string} - 基础目录路径
 * @returns {Promise<string[]>} - 返回一个Promise，解析为字符串数组，包含所有文件路径
 */
export const getDirAllFiles = async (baseDir: string): Promise<string[]> => {
  // 使用globby库匹配目录下所有文件，包括隐藏文件
  const files = await globby(["**/*"], { cwd: baseDir, dot: true });
  return files;
};

/**
 * 创建并返回一个CLI进度条实例
 * 该函数用于初始化一个单一进度条，用于在命令行界面显示下载进度
 *
 * @returns {cliProgress.SingleBar} 初始化的进度条实例
 */
export const getCliProgress = (): cliProgress.SingleBar =>
  new cliProgress.SingleBar(
    {
      format:
        "下载进度 |" +
        colors.green("{bar}") +
        "| {percentage}% | {value}/{total}",
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true
    },
    cliProgress.Presets.shades_classic
  );

/**
 * 校验当前 Node.js 版本是否符合 package.json 中的要求
 * @param requiredNodeVersion - package.json 中要求的 Node.js 版本
 */
export const checkNodeVersion = (requiredNodeVersion: string): boolean => {
  const currentNodeVersion = process.version;
  if (!semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
    console.error(
      colors.red(
        `当前 Node.js 版本 ${currentNodeVersion} 不符合要求。请使用 Node.js 版本 ${requiredNodeVersion} 或更高版本。`
      )
    );
    return false;
  }
  return true;
};

/**
 * 校验当前 npm 版本是否符合要求
 * @param requiredNpmVersion - package.json 中要求的 npm 版本
 */
export const checkNpmVersion = (requiredNpmVersion: string): boolean => {
  try {
    // eslint-disable-next-line newline-per-chained-call
    const currentNpmVersion = execSync("npm --version").toString().trim();
    if (!semver.satisfies(currentNpmVersion, requiredNpmVersion)) {
      console.error(
        colors.red(
          `当前 npm 版本 ${currentNpmVersion} 不符合要求。请使用 npm 版本 ${requiredNpmVersion} 或更高版本。`
        )
      );
      return false;
    }
    return true;
  } catch {
    console.error(colors.red("无法获取 npm 版本，请确保 npm 已正确安装。"));
    return false;
  }
};

export const sortObject = <T>(
  obj: T,
  keyOrder: string[],
  dontSortByUnicode?: boolean
): T => {
  const res = {};

  if (keyOrder) {
    keyOrder.forEach((key: string) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        res[key] = obj[key];
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete obj[key];
      }
    });
  }

  const keys = Object.keys(obj as object);

  !dontSortByUnicode && keys.sort();
  keys.forEach(key => {
    res[key] = obj[key];
  });

  return res as T;
};
