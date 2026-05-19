import bcrypt from "bcrypt";

import AuthError from "#root/classes/AuthError.js";

export  async function passwordVerify(password, hashedPassword) {
  const ismatch = await bcrypt.compare(password, hashedPassword);
  if (!ismatch) {
    throw new AuthError("Invalid Password", 401);
  }
}

export function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isPasswordValid(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,}$/;
  return passwordRegex.test(password);
}

