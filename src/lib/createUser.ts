import { UserModel } from "@/models/userModel";

export async function createUsers(user: any) {
  try {
    await UserModel.create(user);
  } catch (error) {
    throw new Error("User creation failed");
  }
}

export async function getUserByEmail(email: any) {
  const user = await UserModel.findOne({ email: email })
    .select("-password")
    .lean();
  return user;
}
