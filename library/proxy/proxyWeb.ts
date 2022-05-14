import http from "http";
import { getProxyServer } from "./getProxyServer";

export type ProxyWebParams = {
  request: http.IncomingMessage
  response: http.ServerResponse
  options?: any
}

/**
 * 
 * @date 2022-05-14
 */
export function proxyWeb(params: ProxyWebParams): void {
  getProxyServer().web(params.request, params.response, params.options);
}