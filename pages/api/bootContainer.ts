import type { NextApiRequest, NextApiResponse } from "next";
import { startContainer } from "../../library/";

/**
 * 
 * @date 2022-05-15
 */
export default async function bootContainer(
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
  await startContainer(containerId);
  response.status(200)
    .json({
      success: true
    });
}
export type ResponseData = {
  success: boolean
  msg?: string
  result?: any
};