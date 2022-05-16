import type { NextApiRequest, NextApiResponse } from "next";
import { deleteDomainBind } from "../../library/";

/**
 * 
 * @date 2022-05-16
 */
export default async function deleteDomain(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  const domain: string = request.query.domain + "";
  const data = await deleteDomainBind(domain);

  response.status(200)
    .json({
      success: true,
      msg: data
    });
}
export type ResponseData = {
  success: boolean
  msg?: string
  result?: any
};