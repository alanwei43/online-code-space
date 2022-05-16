import { CaddyRoute } from "./getCaddyFile"

export type GenerateReverseProxyRouteParams = {
  domain: string
  dial: string
}
export interface GenerateReverseProxyRouteResult { }

/**
 * 生成 reverse_proxy 类型路由
 * @date 2022-05-16
 */
export function generateReverseProxyRoute(params: GenerateReverseProxyRouteParams): CaddyRoute {
  if (!params.domain || !params.dial) {
    throw new Error(`domain/dial 不能为空`);
  }

  return {
    "@id": params.domain,
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
                    "dial": params.dial
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
          params.domain
        ]
      }
    ],
    "terminal": true
  };
}