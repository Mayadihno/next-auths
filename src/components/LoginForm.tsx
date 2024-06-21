"use client";
import React, { useState } from "react";
import SocialLogin from "./SocialLogin";
import { doCredentialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  async function onSubmit(event: any) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/home");
      }
    } catch (e: any) {
      console.error(e);
      setError("Incorrect email or password");
    }
  }

  return (
    <div>
      <div className="text-xl text-red-500">{error}</div>
      <form
        className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
        onSubmit={onSubmit}
      >
        <div className="my-2">
          <label htmlFor="email">Email Address</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
        >
          Ceredential Login
        </button>
      </form>
      <SocialLogin />
    </div>
  );
};

export default LoginForm;
