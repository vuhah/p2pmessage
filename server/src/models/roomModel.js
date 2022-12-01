import mongoose, { Schema } from "mongoose";

const roomSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  users: [Schema.Types.ObjectId],
  messages: [
    {
      message: { type: String, require: true },
      timestamp: { type: Date, require: true },
      sender: { type: Schema.Types.ObjectId, ref: "user" },
    },
  ],
  timeLastMessage: { type: Date },
});

export const room = mongoose.model("room", roomSchema);
