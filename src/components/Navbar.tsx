import Link from "next/link";
import Image from "next/image";
import Logout from "./Logout";
import { Session } from "next-auth";
import { auth } from "@/auth/auth";
import { useSession } from "next-auth/react";

const Navbar = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  //console.log(loggedInUser);
  const userName = loggedInUser?.name;

  return (
    <header className="flex justify-between bg-slate-900 text-white p-2">
      <Link href="/">
        <h1 className="text-2xl">Product App</h1>
      </Link>
      <nav>
        <ul className="flex pt-1">
          {userName ? (
            <li className="flex">
              <Link href="/dashboard">
                {session?.user?.image ? (
                  <Image
                    src={session?.user?.image}
                    alt={""}
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                ) : (
                  <h2>Image</h2>
                )}
              </Link>
              <span className="mx-1">|</span>
              <Logout />
            </li>
          ) : (
            <>
              <li className="mx-2">
                <Link href="/login">Login</Link>
              </li>
              <li className="mx-2">
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
