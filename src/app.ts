import "dotenv/config";
// import { dbConexion } from "./db";
import express from "express";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  //   dbConexion();
});
