import flagService from "@frontend/services/flagService";
import { NextApiRequest, NextApiResponse } from "next";

const flagStatusHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;
  const status = await flagService.getFlag(key);
  return res.status(200).json({ status });
};
export default flagStatusHandler;
