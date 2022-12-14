import { roomService } from "../services/roomService.js";
import mongoose from "mongoose";

export const listRooms = async (req, res) => {
  const userID = req.id;
  const rooms = await roomService.findRooms(userID);
  res.send(rooms);
};

export const createRoom = async (req, res) => {
  const _id = mongoose.Types.ObjectId();
  const userID1 = req.id;
  const userID2 = req.body.userID;
  if ((await roomService.findRoom(userID1, userID2)) === null) {
    const room = await roomService.createRoom(_id, userID1, userID2);
    res.send(room);
  } else {
    res.send({ message: "Room already exist!" });
  }
};
export const room = async (req, res) => {
  const partnerID = req.params.id;
  if (partnerID.match(/^[0-9a-fA-F]{24}$/)) {
    const userID = req.id;
    const specificRoom = await roomService.findRoom(userID, partnerID);
    res.send(specificRoom);
  } else {
    res.send({ message: "" });
  }
};

export const storeMessage = async (req, res) => {
  const userID = req.id;
  const { roomID, message } = req.body;
  console.log(roomID,userID,message);
  await roomService.updateMessage(roomID,userID,message)
  res.status(200).send("OK")
};
