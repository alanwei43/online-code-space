import { fetch } from "undici";
import { getConfig } from "./getConfig";
import { getCaddyFile } from "./getCaddyFile";

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
  const caddyFile = await getCaddyFile("/apps/http/servers/srv1/routes");
  const domain = `${params.subdomain}.app.alanwei.com`;
  if (JSON.stringify(caddyFile).includes(domain)) {
    return `${domain} 已经被绑定`;
  }

  const response = await fetch(`${config.adminUrl}/config/apps/http/servers/srv1/routes`, {
    method: "POST",
    body: JSON.stringify({
      "handle": [
        {
          "handler": "subroute",
          "routes": [
            {
              "handle": [
                {
                  "handler": "reverse_proxy",
                  "upstreams": [
                    {
                      "dial": `${params.host}:${params.port}`
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      "match": [
        {
          "host": [
            domain
          ]
        }
      ],
      "terminal": true
    }),
    headers: {
      "content-type": "application/json"
    }
  });
  const result = await response.text();
  return result;
}