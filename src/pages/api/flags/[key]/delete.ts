import flagService from "@frontend/services/flagService";
import { NextApiRequest, NextApiResponse } from "next";

const deleteFlagHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { key } = req.query;

  await flagService.deleteFlag(key as string);
  const flags = await flagService.getFlags();
  return res.status(200).json(flags);
};
export default deleteFlagHandler;
