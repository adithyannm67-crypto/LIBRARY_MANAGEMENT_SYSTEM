
import { authenticate } from "../middleware/auth.middleware.js";
import { matchRoute } from "./matcher.js";
export default async function handlerFunction(req) {
  try {
    const match = matchRoute(req);

    if (!match) {
      const error = new Error("Route not found");
      error.statusCode = 404;
      throw error;
    }

    const { route, params } = match;
    console.log("Incoming:", route.method, route.path);
    let user = null;
    if (route.isProtected) {
      user = authenticate(req);
    }
    return await route.handler({ params, user, req });
  } catch (err) {
    
    //For Auth errors
    if (err.statusCode) throw err;
    //For normal errors
    const e = new Error(err.message || "Something went wrong");
    e.statusCode = err.statusCode || 400;

    throw e;
  }
}
