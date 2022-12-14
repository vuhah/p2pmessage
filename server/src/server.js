import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import api from "./routes/api.js";

const app = express();

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", api);

export default app;
