import AppError from "./classes/AppError.js";

export default function dbErrorMapper(err) {
  switch (err.code) {
    case "23505":
      return new AppError("Resource already exists", 409);
    case "23503":
      return new AppError("Invalid Reference ", 404);
    case "23502":
      return new AppError("Missing required fields", 400);
    case "23514":
      return new AppError("Constraint violation", 400);
    case "22P02":
      return new AppError("Invalid Input Format", 400);
    default:
      console.error("Unhandled DB Error : ", {
        code: err.code,
        message: err.message,
      });
      return err;
  }
}
