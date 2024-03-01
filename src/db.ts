import mongoose from "mongoose";

export const dbConexion = async (): Promise<void> => {
  await mongoose
    .connect(process.env.URI_MONGO || "BD")
    .then(() => {
      console.log("--Connect databases--");
    })
    .catch((error) => {
      console.log("No database connection", error);
    });
};
