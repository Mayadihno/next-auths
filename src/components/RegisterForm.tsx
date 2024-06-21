"use client";
import { useRouter } from "next/navigation";
import React from "react";

const RegisterForm = () => {
  const router = useRouter();
  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const fullName = formData.get("fullName");
      const email = formData.get("email");
      const password = formData.get("password");

      const reponse = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      if (reponse.status === 201) {
        router.push("/");
      } else {
        console.log("Registeration Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* <div className="text-xl text-red-500">{error}</div> */}
      <form
        className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
        onSubmit={onSubmit}
      >
        <div className="my-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="text"
            name="fullName"
            id="fullName"
          />
        </div>

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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
