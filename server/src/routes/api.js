import { Router } from "express";
import auth from "./auth.route.js";
import user from "./user.route.js";

const api = Router();

api.use("/auth", auth);
api.use("/user", user);

export default api;
