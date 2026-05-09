import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

import AuthError from "#root/classes/AuthError.js";

export function getJWTToken(user) {
  return jwt.sign(
    {
      email: user.email,
      userid: user.userid,
      username: user.name,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
}

export function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (e) {
    console.error(e);
    throw new AuthError("Invalid Token", 401);
  }
}

export function authenticate(req) {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new AuthError("Unauthorized", 401);
  }
  const token = auth.split(" ")[1];
  return decodeToken(token);
}
