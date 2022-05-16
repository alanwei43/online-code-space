import { fetchJson } from "../utils"
import { getConfig } from "./getConfig"

/**
 * 删除域名绑定
 * @date 2022-05-16
 */
export async function deleteDomainBind(id: string): Promise<string> {
  const config = getConfig();
  const response = await fetchJson<any>("DELETE", `${config.adminUrl}/id/${id}`);
  return JSON.stringify(response || "");
}