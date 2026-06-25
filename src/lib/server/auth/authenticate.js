import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import AuthError from "../error/AuthError.js";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function authenticate() {
  const token =
    (await cookies()).get("token")?.value;



  if (!token) {
    throw new AuthError("Unauthorized", 401);
  }

  try {
    return jwt.verify(token,JWT_SECRET);
  } catch {
    throw new AuthError("Unauthorized", 401);
  }
}