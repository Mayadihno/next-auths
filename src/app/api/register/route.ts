import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import { createUsers } from "@/lib/createUser";

export const POST = async (request: NextRequest) => {
  const { fullName, password, email } = await request.json();

  //db connection
  await dbConnect();
  //password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    fullName,
    email,
    password: hashedPassword,
  };

  //update db
  try {
    await createUsers(newUser);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 501 });
  }

  return new NextResponse("User Created Successfully", { status: 201 });
};
