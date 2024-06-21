import { auth } from "@/auth/auth";
import Logout from "@/components/Logout";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import image from "../../../public/vercel.svg";

const page = async () => {
  const session = await auth();

  const userImage = session?.user?.image || image;

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center m-4">
      <h1 className="text-3xl my-2">Welcome, {session.user.name}</h1>
      <h1 className="text-3xl my-2">
        Welcome, {session?.user?.email ?? "user@gmail.com"}
      </h1>
      <Image
        src={userImage}
        alt={session?.user?.name || "User name"}
        width={72}
        height={72}
        className="rounded-full"
      />
      <Logout />
    </div>
  );
};

export default page;
