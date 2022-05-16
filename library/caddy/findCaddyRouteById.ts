import { CaddyRoute, getCaddyFile } from "./getCaddyFile"
import { getConfig } from "./getConfig";
import { fetchJson, Protocol } from "../utils";

/**
 * 读取路由配置
 * @date 2022-05-16
 */
export async function findCaddyRouteById(id: string): Promise<Protocol<CaddyRoute>> {
  const config = getConfig();
  const response = await fetchJson<CaddyRoute & { error: string }>("GET", `${config.adminUrl}/id/${id}`);
  if (response.error) {
    return { success: false, msg: response.error };
  }
  return { success: true, result: response };
}