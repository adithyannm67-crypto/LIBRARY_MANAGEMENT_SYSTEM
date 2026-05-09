import AuthError from "#root/classes/AuthError.js";

export default function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch (e) {
        reject(new AuthError("Invalid Request", 400));
      }
    });
    req.on("error", (error) => {
      reject(new AuthError("Invalid Request", 400));
    });
  });
}
