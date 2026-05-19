import { authenticate } from "../middleware/auth.middleware.js";
import { matchRoute } from "./matcher.js";
import dbErrorMapper from "../utils/error/dbErrorMapper.js";
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
    const mappedError = dbErrorMapper(err);
    const isUnhandledDbError = err.code && !err.statusCode;

    if (!isUnhandledDbError) console.error("Error   :  ", mappedError);
    throw mappedError;
  }
}
