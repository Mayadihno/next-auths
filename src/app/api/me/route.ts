import { auth } from "@/auth/auth";
import { getUserByEmail } from "@/lib/createUser";
import dbConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(`You are not authenticated!`, {
      status: 500,
    });
  }

  await dbConnect();

  try {
    const user = await getUserByEmail(session?.user?.email || "");
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
