import getUserDetails from "./auth.repository.js";
import passwordVerify from "#root/middleware/validation.middleware.js";
import { getJWTToken } from "#root/middleware/auth.middleware.js";
import parseBody from "#root/utils/parseBody.js";

// import {bcrypt}  from "bcrypt"


export async function login({req}) {
  
  const body = await parseBody(req);

  const { email, password } = body;
  if (!email || !password) {
    throw new AuthError("Missing Credentials", 400);
  }

  const user = await getUserDetails(email);

  await passwordVerify(password, user.password);

  delete user.password;

  const token = getJWTToken(user);

  return {
  
    success: true,
    data:{token:token},
    message: "Login Successfull",
    error: null
  };
}
