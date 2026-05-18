

import { getDashBoardDataRepo } from "./user.repository.js";

export async function getDashBoarddata({ user }) {
    const data = await getDashBoardDataRepo(user.userid)
    return { success: true, data, message: "Data Fetched Successfully", error: null };

}