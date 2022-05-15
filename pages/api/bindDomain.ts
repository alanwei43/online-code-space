import type { NextApiRequest, NextApiResponse } from "next";
import { CreateDomainBindParams, createDomainBind } from "../../library";

/**
 * 
 * @date 2022-05-15
 */
export default async function bindDomain(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  const bind: CreateDomainBindParams = request.body;
  if (!bind) {
    response.status(400).json({
      success: false,
      msg: `请求参数无效`
    });
    return;
  }
  const result = await createDomainBind(bind)

  response.status(200).json({
    success: true,
    msg: result
  });
}
export type ResponseData = {
  success: boolean
  msg?: string
  result?: any
};