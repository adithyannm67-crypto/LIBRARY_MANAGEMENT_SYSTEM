"use client";
import { isEmailValid, isPasswordValid } from "../validator";
import loginUser from "@/lib/server/login";

import { jwtDecode } from "jwt-decode";

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
    const token = await loginUser(email, password);
    localStorage.setItem("token", token);
    document.cookie = `token=${token};path=/;max-age=${60 * 60 * 24 * 30}`;
    const decoded = jwtDecode(token);

    return decoded;
  } catch (e) {
    return [e.message || "An error occurred during login"];
  }
}
