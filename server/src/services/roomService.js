import { room } from "../models/roomModel.js";

export class roomService{
    static listRooms = async (userID) => {
        const listRooms = await room.find({users:userID})
        return listRooms
    }
    
}