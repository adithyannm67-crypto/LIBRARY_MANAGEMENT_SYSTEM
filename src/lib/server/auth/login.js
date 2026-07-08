"use server";

import {
  passwordVerify,
  getJWTToken,
  storeToken,
} from "../utils/auth.utils.js";

import getUserDetails from "../repository/user.repository.js";
import AuthError from "../error/AuthError.js";

export default async function loginUser(email, password) {
  const user = await getUserDetails(email);

  
  await passwordVerify(password, user.password);

  delete user.password;

  const token = getJWTToken(user);

  if (!token) {
    throw new AuthError("Token Generation Failed", 500);
  }

  await storeToken(token);

  return user;
}
