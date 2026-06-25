import authenticate from "../auth/authenticate";

import getBookDetails from "../repository/getAllAvailableBooks";

export default async function fetchAvailableBooks({ limit } = {}) {
  await authenticate();
  return getBookDetails({ limit });
}
