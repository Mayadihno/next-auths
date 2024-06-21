import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <RegisterForm />
      <div className="text-center">
        <p className="my-3">
          Already have an account?
          <Link href={"/login"} className="mx-2 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
