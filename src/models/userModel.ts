import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  fullName: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
});

export const UserModel =
  mongoose.models.UserModel ?? mongoose.model("UserModel", userSchema);
