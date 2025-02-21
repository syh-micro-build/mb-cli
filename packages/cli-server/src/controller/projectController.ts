import express from "express";

import HttpResult from "../common/httpResult";
import ProjectService from "../services/projectService";

const router: express.Router = express.Router();

/**
 * @swagger
 * /project/getDependentList:
 *   get:
 *     tags:
 *       - project
 *     summary: "获取项目依赖列表"
 *     description: 获取项目依赖列表
 *     parameters:
 *       - in: query
 *         name: path
 *         description: 文件夹路径
 *         required: true
 *         schema:
 *           type: string
 *           default: /Users/wutan/Desktop/yd_project/mb-cli
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/getDependentList", async (req, res) => {
  const { path } = req.query;
  if (!path) {
    res.status(500).send(HttpResult.error("获取文件失败"));
  }
  try {
    const result = await ProjectService.getDependentList(path as string);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(HttpResult.error("获取项目配置失败"));
  }
});

/**
 * @swagger
 * /project/searchHttpDependentList:
 *   get:
 *     tags:
 *       - project
 *     summary: "获取依赖列表"
 *     description: 获取依赖列表 参数内容参考 https://github.com/npm/registry/blob/main/docs/responses/package-metadata.md
 *     parameters:
 *       - in: query
 *         name: text
 *         description: 名称
 *         required: true
 *         schema:
 *           type: string
 *           default: zyran-cli
 *       - in: query
 *         name: page
 *         description: 页码
 *         required: true
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         description: 页数
 *         required: true
 *         schema:
 *           type: number
 *           default: 1
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/searchHttpDependentList", async (req, res) => {
  const { page = 1, text = "", pageSize = 30 } = req.query;

  try {
    const result = await ProjectService.searchHttpDependentList({
      page: page as number,
      text: text as string,
      pageSize: pageSize as number
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(HttpResult.error("搜索依赖失败"));
  }
});

/**
 * @swagger
 * /project/getHttpDependentDetails:
 *   get:
 *     tags:
 *       - project
 *     summary: "获取依赖详情"
 *     description: 获取依赖详情 参数内容参考 https://github.com/npm/registry/blob/main/docs/responses/package-metadata.md
 *     parameters:
 *       - in: query
 *         name: text
 *         description: 名称
 *         required: true
 *         schema:
 *           type: string
 *           default: zyran-cli
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/getHttpDependentDetails", async (req, res) => {
  const { text = "" } = req.query;
  try {
    const result = await ProjectService.getHttpDependentDetails({
      text: text as string
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(HttpResult.error("搜索依赖失败"));
  }
});

export default router;
