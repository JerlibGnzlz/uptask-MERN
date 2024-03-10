import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "../interfaces/user.Interfaces";

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);


export const Usermodel = model<IUser>("User", userSchema)
