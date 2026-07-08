import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import AuthError from "../error/AuthError.js";

const JWT_SECRET = process.env.JWT_SECRET;

async function passwordVerify(password, hashedPassword) {
  const ismatch = await bcrypt.compare(password, hashedPassword);
  if (!ismatch) {
    throw new AuthError("Invalid Email or Password", 401);
  }
}

function getJWTToken(user) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }
  return jwt.sign(
    {...user},
    JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
}

async function storeToken(token) {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export { passwordVerify, getJWTToken, storeToken };
