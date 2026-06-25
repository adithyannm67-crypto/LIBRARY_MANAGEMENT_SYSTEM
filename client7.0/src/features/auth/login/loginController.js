"use client";
import { isEmailValid, isPasswordValid } from "../validator";
import loginUser from "#root/lib/server/auth/login.js";

export default async function login(email, password) {
  let err = [];
  email = email.trim().toLowerCase();
  password = password.trim();
  if (!email || !password) {
    err.push("Email and password are required");
    return err;
  }
  if (!isEmailValid(email)) {
    err.push("Email is not valid");
  }
  if (!isPasswordValid(password)) {
    err.push("Password is not valid");
  }

  if (err.length > 0) return err;
  return await userVerfy(email, password);
}

async function userVerfy(email, password) {
  try {
    const decoded = await loginUser(email, password);
    return decoded;
  } catch (e) {
    return [e.message || "An error occurred during login"];
  }
}
