import { NextApiResponse } from "next";
export default async function handler(req: NextRequest, res: NextApiResponse) {
  res
    .status(200)
    .json({ message: "DONE THE NEXT API AFTER MIDDLEWARE", data: req.user });
}
