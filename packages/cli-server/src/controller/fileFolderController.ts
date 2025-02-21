import express from "express";

import HttpResult from "../common/httpResult";
import fileFolderService from "../services/fileFolderService";

const router: express.Router = express.Router();

/**
 * @swagger
 * /fileFolder/getAllFile:
 *   get:
 *     tags:
 *       - fileFolder
 *     summary: "获取文件夹下所有文件"
 *     description: 返回文件夹下所有文件
 *     parameters:
 *       - in: query
 *         name: path
 *         description: 文件夹路径
 *         required: true
 *         schema:
 *           type: string
 *           default: /Users/wutan/Desktop/yd_project/mb-cli/packages/cli-server/src
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/getAllFile", async (req, res) => {
  const { path } = req.query;
  if (!path) {
    res.status(500).send(HttpResult.error("获取文件失败"));
  }
  try {
    const result = await fileFolderService.getAllFile(path as string);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(HttpResult.error("获取项目配置失败"));
  }
});

export default router;
