import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
export const getPayload = (req: NextApiRequest) => {
  const token = req.headers["authorization"] as string;
    const bearerToken = token.split(" ")[1];
    const payload: any = jwt.decode(bearerToken);
    return payload
}