import http from "http";
import { getProxyServer } from "./getProxyServer";
export type ProxyWsParams = {
  request: http.IncomingMessage
  socket: any
  header: any
  options: any
}

/**
 * 代理 ws
 * @date 2022-05-14
 */
export function proxyWs(params: ProxyWsParams): void {
  const svr = getProxyServer();
  svr.ws(params.request, params.socket, params.header, params.options);
}