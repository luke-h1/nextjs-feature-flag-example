import flagService from "@frontend/services/flagService";
import { NextApiRequest, NextApiResponse } from "next";

const flushHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const flags = await flagService.flush();
  return res.status(200).json({
    message: "Redis flushed",
  });
};
export default flushHandler;
