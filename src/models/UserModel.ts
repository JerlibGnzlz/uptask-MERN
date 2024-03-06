import { Schema, model } from "mongoose";
import bcript from "bcrypt";

import { User } from "../interfaces/user.Interfaces";

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
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcript.genSalt(10);
  this.password = await bcript.hash("this.password", salt);
});

export const Usermodel = model<User>("User", userSchema);
