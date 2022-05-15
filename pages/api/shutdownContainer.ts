import type { NextApiRequest, NextApiResponse } from "next";
import { stopContainer } from "../../library";

/**
 * 
 * @date 2022-05-15
 */
export default async function shutdownContainer(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  if (!request.query.id) {
    response.status(400).json({
      success: false,
      msg: `id can't be empty`
    })
    return;
  }
  const containerId: string = request.query.id + "";
  const result = await stopContainer(containerId);
  response.status(200)
    .json({
      success: true,
      msg: result
    });
}
export type ResponseData = {
  success: boolean
  msg?: string
  result?: any
};