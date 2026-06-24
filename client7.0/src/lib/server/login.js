"use server";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

import getUserDetails from "./actions/login.js";
import AuthError from "./classes/AuthError.js";

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

  return token;
}

 async function passwordVerify(password, hashedPassword) {
  const ismatch = await bcrypt.compare(password, hashedPassword);
  if (!ismatch) {
    throw new AuthError("Invalid Password", 401);
  }
}

 function getJWTToken(user) {
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
