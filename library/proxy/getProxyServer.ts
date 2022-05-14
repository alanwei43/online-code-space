import HttpProxy from "http-proxy";

export type GetProxyServerResult = HttpProxy
export type GetProxyServerDef = {
  (): GetProxyServerResult
  __instance?: GetProxyServerResult
}

/**
 * 
 * @date 2022-05-14
 */
export const getProxyServer: GetProxyServerDef = function (): GetProxyServerResult {
  if (getProxyServer.__instance) {
    return getProxyServer.__instance;
  }

  const proxy = HttpProxy.createProxyServer({
    changeOrigin: true,
    ws: true,
    timeout: 3 * 1000,
    proxyTimeout: 3 * 1000
  });
  getProxyServer.__instance = proxy;
  return getProxyServer.__instance;
}