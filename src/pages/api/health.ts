import type { NextApiRequest, NextApiResponse } from "next";

export default function healthHandler(
  _req: NextApiRequest,
  res: NextApiResponse<{ status: string }>
) {
  res.status(200).json({ status: "OK" });
}
