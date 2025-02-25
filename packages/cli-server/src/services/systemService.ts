import { terminatePort } from "@mb-cli/utils";

import HttpResult from "../common/httpResult";

class SystemService {
  async stopPort(port: number): Promise<HttpResult<boolean | string>> {
    try {
      const result = await terminatePort(port);
      return HttpResult.success(result);
    } catch {
      return HttpResult.error("终止失败");
    }
  }
}

export default new SystemService();
