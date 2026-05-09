import bcrypt from "bcrypt";

import AuthError from "#root/classes/AuthError.js";

export default async function passwordVerify(password, hashedPassword) {
  const ismatch = await bcrypt.compare(password, hashedPassword);
  if (!ismatch) {
    throw new AuthError("Invalid Password", 401);
  }
}
