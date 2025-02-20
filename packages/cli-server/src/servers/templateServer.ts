import { getTemplateMap } from "@mb-cli/project-template";

import HttpResult from "../common/httpResult";
import { OptionsInterface } from "../types";

class TemplateServers {
  async getAll(): Promise<HttpResult<OptionsInterface[]>> {
    const templatesMap = await getTemplateMap();

    const result = Array.from(templatesMap.keys()).map(item => ({
      label: `${item}`,
      value: item,
      children: templatesMap.get(item)?.map(e => ({
        label: `${e}模版`,
        value: e
      }))
    }));

    return HttpResult.success(result);
  }
}

export default new TemplateServers();
