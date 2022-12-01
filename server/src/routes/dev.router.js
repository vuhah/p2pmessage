import { Router } from "express";
import { clearUser } from "../controllers/dev.controller.js";

const router = Router();

router.post("/clearuser", clearUser);

export default router;
