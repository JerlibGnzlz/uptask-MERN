import "dotenv/config";
import cors from "cors";
import { dbConexion } from "./db";
import express from "express";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PUT"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// app.use(router);
app.get("/", (req, res) => {
  res.send("desde app");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  dbConexion();
});
