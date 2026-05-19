
import getUserDetails from "./auth.repository.js";
import {
  passwordVerify,
  isEmailValid,
  isPasswordValid,
} from "#root/middleware/validation.middleware.js";
import { getJWTToken } from "#root/middleware/auth.middleware.js";
import AuthError from "#root/classes/AuthError.js";


export async function loginUser(email, password) {
    if (!email || !password) {
        throw new AuthError("Missing Credentials", 400);
      }
    
      if (!isEmailValid(email)|| !isPasswordValid(password)) {
        throw new AuthError("Invalid Credentials", 400);
      }
    
      const user = await getUserDetails(email);
    
      const {
        userid,
        role,
        name,
      } = user;
      await passwordVerify(password, user.password);
    
      delete user.password;
    
      const token = getJWTToken({
        userid,
        role,
        name,
        email,
      });
      
      if(!token){
        throw new AuthError("Token Generation Failed", 500);
      }
    
      return token;
    
}