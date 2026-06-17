import { cookies } from "next/headers";

export default async function fetchDashBoardData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token").value;

  if (!token) throw new Error("User not authenticated");
  const res = await fetch(`http://localhost:5000/api/loadDashboard/`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "GET",
  });
  const body = await res.json();
  if (!body.success || !res.ok)
    throw new Error(body?.message || "Failed to load dashboard data");
  return body.data;
}

