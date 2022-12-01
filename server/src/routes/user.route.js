import { Router } from "express";
import { profile, listUser } from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { refreshToken } from "../middleware/refreshToken.js";

const router = Router();

router.use(authenticateToken)
router.use(refreshToken)

router.get("/profile", profile);
router.get("/listUser",listUser)

export default router;
