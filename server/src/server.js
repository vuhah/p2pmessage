import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import api from "./routes/api.js";

const app = express();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   next();
// });

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", api);

export default app;
