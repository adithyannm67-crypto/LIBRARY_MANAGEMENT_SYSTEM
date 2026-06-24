import { failure } from "./responces";

export default function apiHandler(handler) {
  return async function (...args) {
    try {
      return await handler(...args);
    } catch (error) {
      return failure({ message: error.message, error });
    }
  };
}
