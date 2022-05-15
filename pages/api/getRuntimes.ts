import type { NextApiRequest, NextApiResponse } from "next";
import { getContainerRuntimes, getContainerRuntimesList } from "../../library";

/**
 * 
 * @date 2022-05-15
 */
export default async function getRuntimes(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  const runtimes = getContainerRuntimesList();
  response.status(200)
    .json({
      success: true,
      result: runtimes
    });
}
export type ResponseData = {
  success: boolean
  msg?: string
  result?: any
};