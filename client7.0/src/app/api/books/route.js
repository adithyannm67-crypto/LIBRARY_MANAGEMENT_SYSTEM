import { NextResponse } from "next/server";

import apiHandler from "#root/lib/server/actions/wrapper/apiHandler.js";
import { success } from "#root/lib/server/actions/wrapper/responces.js";

import getAllBooks from "@/lib/server/actions/getAllBooks";
import authenticate from "#root/lib/server/middleware/authenticate.js";

export async function GET(request) {
  try {
    await authenticate();
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || undefined;

    const result = await getAllBooks({ limit: limit ? Number(limit) : null });
    return success({
      data: result,
      message: "Books Fetched Successfully",
    });
  } catch (er) {
    console.log("error");
    console.log(er);
  }
}
