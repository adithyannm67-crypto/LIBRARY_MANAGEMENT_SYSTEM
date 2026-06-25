import authenticate from "../auth/authenticate";

import getActiveBorrowRecordById from "../repository/getActiveBorrowRecordById";

export default async function fetchActiveBorrows() {
  const user = await authenticate();
  return getActiveBorrowRecordById(user?.userid);
}
