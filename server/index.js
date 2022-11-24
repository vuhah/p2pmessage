import app from "./src/server.js";
import mongoose from "mongoose";
import config from "./config/config.js";
import {createServer} from "http"
import {Server} from 'socket.io'

const server = createServer(app)
const io = new Server(server)

mongoose
  .connect(`mongodb+srv://${config.DB_USERNAME}:leanhvu123@cluster0.zsjsdin.mongodb.net/messv2`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>console.log('connectOK'))
  .catch((err) => console.log(err))

io.on('connection',(socket)=>{
  console.log('connect socket sussesfully');
})

server.listen(8000,()=>{
  console.log(`okal${config.PORT}`)
})
 