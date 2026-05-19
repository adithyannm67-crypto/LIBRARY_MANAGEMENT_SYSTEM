import { getDashBoardData } from "./user.service.js";

export async function getDashBoarddataController({ user }) {
  const dashBoardData = await getDashBoardData(user.userid);
  return {
    success: true,
    data: dashBoardData,
    message: "Data Fetched Successfully",
    error: null,
  };
}
