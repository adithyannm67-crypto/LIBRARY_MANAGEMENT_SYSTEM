import authenticate from "../auth/authenticate";

import getBookById from "../repository/getAvailableBookById";

export default  async function fetchBookById(bookid) {
  const user = await authenticate();
  return getBookById(bookid, user?.userid);
}
