import type { NextApiRequest, NextApiResponse } from "next";
import { ContainerInfo, getAllContainers } from "../../library";

/**
 * 
 * @date 2022-05-14
 */
export default async function listContainers(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  const containers = await getAllContainers();
  response.status(200)
    .json({
      success: true,
      result: containers
    });
}
export type ResponseData = {
  success: boolean
  msg?: string
  result?: any
};