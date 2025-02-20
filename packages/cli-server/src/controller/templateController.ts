import express from "express";

import HttpResult from "../common/httpResult";
import templateServers from "../servers/templateServer";

const router: express.Router = express.Router();

/**
 * @swagger
 * /template/getAll:
 *   get:
 *     tags:
 *       - template
 *     summary: "获取所有项目模版"
 *     description: 返回项目类型+模版名称
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/getAll", async (req, res) => {
  try {
    const result = await templateServers.getAll();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(HttpResult.error("获取项目配置失败"));
  }
});

export default router;
