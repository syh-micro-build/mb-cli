import ejs from "ejs";
import fs from "fs";
import { globby } from "globby";
import { isBinaryFileSync } from "isbinaryfile";
import path from "path";
import resolve from "resolve";

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
 * 写入文件
 * @param filePath 文件路径
 * @param content 内容
 */
export const writeFile = async (
  filePath: string,
  content: string | Buffer<ArrayBufferLike> | undefined
): Promise<void> => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content || "", {
    encoding: "utf-8"
  });
};

/**
 * 获取目录下所有文件
 * @param baseDir 目录
 * @returns
 */
export const getDirAllFiles = async (baseDir: string): Promise<string[]> => {
  const files = await globby(["**/*"], { cwd: baseDir, dot: true });
  return files;
};
