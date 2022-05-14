import http from "http";
import { getProxyServer } from "./getProxyServer";

export type ProxyHttpParams = {
  request: http.IncomingMessage
  response: http.ServerResponse
  options?: any
}

/**
 * 
 * @date 2022-05-14
 */
export function proxyHttp(params: ProxyHttpParams): void {
  getProxyServer().web(params.request, params.response, params.options);
}