import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import AuthError from "../classes/AuthError.js";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function authenticate() {
  const cookieStore = await cookies();
  const token = cookieStore?.get("token")?.value;
  console.log(cookieStore.getAll());
  if (!token) throw new AuthError("Unauthorized", 401);
  return decodeToken(token);
}

function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (e) {
    throw new AuthError("Invalid Token", 401);
  }
}
