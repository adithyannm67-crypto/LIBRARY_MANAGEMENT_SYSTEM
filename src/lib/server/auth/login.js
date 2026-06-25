"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

import getUserDetails from "../repository/getUserById.js";
import AuthError from "../error/AuthError.js";

export default async function loginUser(email, password) {
  const user = await getUserDetails(email);

  const { userid, role, name } = user;
  await passwordVerify(password, user.password);

  delete user.password;

  const token = getJWTToken({
    userid,
    role,
    name,
    email,
  });

  if (!token) {
    throw new AuthError("Token Generation Failed", 500);
  }

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return user
}

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
