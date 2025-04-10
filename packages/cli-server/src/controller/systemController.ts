import express from "express";

import HttpResult from "../common/httpResult";
import systemService from "../services/systemService";

const router: express.Router = express.Router();

/**
 * @swagger
 * /system/delPort:
 *   delete:
 *     tags:
 *       - system
 *     summary: "终止端口"
 *     parameters:
 *       - in: query
 *         name: port
 *         description: 端口
 *         required: true
 *         schema:
 *           type: number
 *           default: 5173
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.delete("/delPort", async (req, res) => {
  const { port } = req.query as unknown as { port: number };
  try {
    const result = await systemService.stopPort(port);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(HttpResult.error("终止端口失败"));
  }
});

export default router;
