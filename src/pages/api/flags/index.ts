import flagService from "@frontend/services/flagService";
import { NextApiRequest, NextApiResponse } from "next";

const flagHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const flags = await flagService.getFlags();
  return res.status(200).json(flags);
};
export default flagHandler;
