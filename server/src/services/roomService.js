import { room } from "../models/roomModel.js";

export class roomService {
  static listRooms = async (userID) => {
    const listRooms = await room.find({ users: userID });
    return listRooms;
  };
  static createRoom = async (_id, userID1, userID2) => {
    return await room.create({
      _id: _id,
      users: [userID1, userID2],
      messages: [
        {
          message: "Hi!",
          timestamp: new Date(),
          sender: userID1,
        },
      ],
      timeLastMessage: new Date(),
    });
  };
  static findRooms = async (userID1) => {
    const rooms = await room
      .find({ users: userID1 })
      .select("users messages.message messages.timestamp");
    return rooms;
  };
  static findRoom = async (userID1, userID2) => {
    const specificroom = await room.findOne({
      users: { $all: [userID1, userID2] },
    });
    return specificroom;
  };
  static updateMessage = async (roomID, senderID, message) => {
    const doc = await room.findOne({ _id: roomID });
    doc.messages.push({
      message: message,
      timestamp: new Date(),
      sender: senderID,
    });
    await doc.save();
  };
}
