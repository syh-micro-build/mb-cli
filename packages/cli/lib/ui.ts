import path from "path";
import { createServer } from "vite";

const startUi = async (): Promise<void> => {
  const docs = path.resolve(__dirname, "../../../web/ui");
  const server = await createServer({
    configFile: path.resolve(docs, "vite.config.ts"),
    server: {
      port: 3000
    },
    root: docs
  });
  await server.listen();
  server.printUrls();
  server.bindCLIShortcuts({ print: true });
};
export default startUi;
