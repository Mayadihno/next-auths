import Link from "next/link";
import Image from "next/image";
import Logout from "./Logout";
import { Session } from "next-auth";
import { auth } from "@/auth/auth";

const Navbar = async () => {
  const session = await auth();
  // const loggedInUser = session?.user;
  // //console.log(loggedInUser);
  // const userName = loggedInUser?.name;

  return (
    <header className="flex justify-between bg-slate-900 text-white p-2">
      <Link href="/">
        <h1 className="text-2xl">Product App</h1>
      </Link>
      <nav>
        <ul className="flex pt-1">
          {session?.user ? (
            <li className="flex">
              <Link href="/dashboard">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={"User Image"}
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[50px] h-[50px] rounded-full bg-white"></div>
                )}
              </Link>

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
