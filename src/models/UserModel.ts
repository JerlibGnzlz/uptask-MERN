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

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash("this.password", salt);
// });

// userSchema.methods.comprobarPassword = async function (passwordTexto: string): Promise<boolean> {
//   return await bcrypt.compare(passwordTexto, this.password)
// }



export const Usermodel = model<IUser>("User", userSchema)
