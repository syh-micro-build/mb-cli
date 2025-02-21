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

export default router;
