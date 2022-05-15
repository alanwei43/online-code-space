import type { NextApiRequest, NextApiResponse } from "next";
import { ContainerInformation, getAllContainers } from "../../library";
import { writeResponoseJson } from "../../library/utils";

/**
 * 列出所有容器
 * @date 2022-05-14
 */
export default async function listContainers(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  const refresh = request.query.refresh === "true";
  const containers = await getAllContainers(refresh);
  writeResponoseJson(response, {
    success: true,
    result: containers
  });
}

export type ResponseData = {
  success: boolean
  msg?: string
  result?: any
};