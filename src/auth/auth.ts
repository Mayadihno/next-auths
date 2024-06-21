import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserModel } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { authConfig } from "./authConfig";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          typeof credentials.email !== "string"
        ) {
          throw new Error("Invalid credentials");
        }

        //   const user = getUserByEmail(credentials.email);
        try {
          const user = await UserModel.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isMatch) {
            throw new Error("Invalid password");
          }

          return user;
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});
