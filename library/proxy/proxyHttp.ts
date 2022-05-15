import http from "http";
import { writeResponoseJson } from "../utils/index";
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
  try {
    getProxyServer()
      .web(params.request, params.response, params.options);
  } catch (ex: any) {
    writeResponoseJson(params.response, {
      success: false,
      msg: `proxyHttp 发生异常: ${ex && ex.message}`
    });
  }
}