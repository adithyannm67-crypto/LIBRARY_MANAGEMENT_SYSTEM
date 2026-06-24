"use server";

import { cookies } from "next/headers";

export default async function logout() {
  const cookieStore = await cookies();

  cookieStore.set("token", "", {
    expires: new Date(0),
    path: "/",
  });
}