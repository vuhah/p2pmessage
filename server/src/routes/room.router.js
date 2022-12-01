import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { refreshToken } from "../middleware/refreshToken.js";
import { listRooms, room, storeMessage } from "../controllers/room.controller.js";

const router = Router();

router.use(authenticateToken);
router.use(refreshToken);

router.get("/", listRooms)
router.get(":id", room);
router.post(":id/storeMessage", storeMessage);
router.post(":id/createRoom",)
export default router;
