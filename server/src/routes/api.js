import { Router } from "express";
import auth from "./auth.route.js";
import user from "./user.route.js";
import room from "./room.router.js";
import dev from "./dev.router.js"

const api = Router();

api.use("/auth", auth);
api.use("/user", user);
api.use("/room", room);
api.use("/dev",dev)

export default api;
