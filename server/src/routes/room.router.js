import { Router } from "express";
// import { authenticateToken } from "../middleware/authenticateToken.js";
// import { refreshToken } from "../middleware/refreshToken.js";
import { listRooms, room, storeMessage, createRoom } from "../controllers/room.controller.js";
import {authentication }from "../middleware/authentication.js"

const router = Router();

// router.use(authenticateToken);
// router.use(refreshToken);
router.use(authentication)

router.get("/listRoom", listRooms)
router.get("/:id", room);
router.post("/storeMessage", storeMessage);
router.post("/createRoom", createRoom)
export default router;
 