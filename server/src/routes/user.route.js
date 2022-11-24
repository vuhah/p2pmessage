import { Router } from "express";
import { profile } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

router.get("/profile", authenticateToken, profile);

export default router;
