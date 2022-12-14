import app from "./src/server.js";
import mongoose from "mongoose";
import config from "./config/config.js";
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

mongoose
  .connect(
    `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster0.zsjsdin.mongodb.net/messv2`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connectOK"))
  .catch((err) => console.log(err));

const users = new Map();

io.on("connection", (socket) => {
  socket.emit("hello, server day");

  socket.on("clientsend", (data) => {
    console.log(data);
    if (data.userID !== null && data.userID !== "") {
      users.set(data.userID,data.peerID)
    }
    console.log(users);
    socket.broadcast.emit("serversend", Array.from(users,([userID, peerID]) => ({userID, peerID})));
    socket.emit("serversend", Array.from(users,([userID, peerID]) => ({userID, peerID})));
  });

});
 
server.listen(8000, () => {
  console.log(`okal8000`);
});

            