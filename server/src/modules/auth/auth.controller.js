
import parseBody from "#root/utils/parseBody.js";
import { loginUser } from "./auth.service.js";

export async function loginController({ req }) {
  const body = await parseBody(req);

  const { email, password } = body;
  
  const token = await loginUser(email, password);
  

  return {
    success: true,
    data: {
      token: token,
    },
    message: "Login Successfull",
    error: null,
  };
}
