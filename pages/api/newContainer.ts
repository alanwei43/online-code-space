import type { NextApiRequest, NextApiResponse } from "next";
import { createContainer, CreateContainerParams } from "../../library";

/**
 * 
 * @date 2022-05-14
 */
export default async function newContainer(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  if (!request.body) {
    response.status(400)
      .json({
        success: false,
        msg: "body为空"
      });
    return;
  }

  const body: CreateContainerParams = request.body;
  const container = await createContainer(body);
  response.status(200)
    .json({
      success: true,
      result: {
        ...body,
        id: container.id,
      }
    });
}
export type ResponseData = {
  success: boolean
  msg?: string
  result?: any
};