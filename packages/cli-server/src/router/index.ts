import { Application } from "express";

import templateController from "../controller/templateController";

/**
 * @swagger
 * tags:
 *   - name: template
 *     description: API related to user management
 */

export const routes = (app: Application): void => {
  app.use("/template", templateController);
};
