import { getConfig } from "./getConfig"
import { fetch } from "undici";

export interface GetCaddyFileResult {
  "admin": {
    "listen": string
  },
  "apps": {
    "http": {
      "http_port": number
      "https_port": number
      "servers": Record<string, {
        "listen": Array<string>,
        "logs": {
          "logger_names": Record<string, string>,
          "skip_hosts": Array<string>
        },
        "routes": Array<CaddyRoute>
      }>
    },
    "tls": {
      "automation": {
        "policies": Array<{
          "issuers": Array<{
            "email": string
            "module": string
          }>
        }>
      }
    }
  },
  "logging": {
    "logs": {
      "default": {
        "encoder": {
          "format": string
        },
        "exclude": Array<string>,
        "level": string
        "writer": {
          "filename": string
          "output": string
          "roll_keep": number
          "roll_keep_days": number
          "roll_size_mb": number
        }
      },
      "log0": {
        "include": Array<string>,
        "writer": {
          "filename": string
          "output": string
        }
      }
    }
  }
}
export type CaddyRoute = {
  "@id"?: string
  "handle": Array<{
    "handler": "subroute" | "vars" | "file_server",
    "routes": Array<{
      "handle": Array<{
        "handler": "reverse_proxy",
        "upstreams": Array<{
          "dial": string
        }>
      }>
    }>
  }>,
  "match": Array<{
    "host": Array<string>
  }>,
  "terminal": boolean
}

/**
 * 
 * @date 2022-05-15
 */
export async function getCaddyFile(): Promise<GetCaddyFileResult> {
  const config = getConfig();
  const resonse = await fetch(`${config.adminUrl}/config`)
  const result = await resonse.json() as GetCaddyFileResult;
  return result;
}