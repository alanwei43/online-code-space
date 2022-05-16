import { getConfig } from "./getConfig";
import { fetchJson } from "../utils";
import { findCaddyRouteById } from "./findCaddyRouteById";
import { generateReverseProxyRoute } from "./generateReverseProxyRoute";

export type CreateDomainBindParams = {
  subdomain: string
  host: string
  port: number
}
export type CreateDomainBindResult = string

/**
 * 创建域名绑定
 * @date 2022-05-15
 */
export async function createDomainBind(params: CreateDomainBindParams): Promise<CreateDomainBindResult> {
  if (!params.host || !/^(\d{1,3}\.){3}\d{1,3}$/.test(params.host)) {
    return `host 不能为空, 且必须是有效的IP地址: ${params.host}`;
  }
  if (!params.port || isNaN(params.port) || params.port <= 0) {
    return `port 不能为空, 且必须是正整数: ${params.port}`;
  }
  if (!params.subdomain || !/^[\w\d_-]+$/.test(params.subdomain)) {
    return `subdomain 必须是字母, 数字, -, _ 之一: ${params.subdomain}`;
  }

  const config = getConfig();
  const domain = `${params.subdomain}.app.alanwei.com`;
  const route = await findCaddyRouteById(domain);
  if (route.result) {
    return `域名 ${domain} 已经被绑定: ${JSON.stringify(route.result)}`;
  }

  const postRoute = generateReverseProxyRoute({
    "dial": `${params.host}:${params.port}`,
    "domain": domain
  });
  const url = `${config.adminUrl}/config/apps/http/servers/srv1/routes`;
  const response = await fetchJson<any>("POST", url, {}, postRoute);
  return JSON.stringify(response || "");
}