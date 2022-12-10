import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addConnections, setCurrentPeerID } from "./redux/peerSlice";
import Peer from "peerjs";
import { io } from "socket.io-client";
import { useRoutes, Routes, Route } from "react-router-dom";
import EntryPage from "./pages/entrypage";
import HomeMessage from "./pages/home";

const peer = new Peer();

const socket = io("http://localhost:8000");

function App() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const currentPeerID = useSelector((state) => state.peer.currentPeerID);
  const connections = useSelector((state) => state.peer.connections);
  const authState = useSelector((state) => state.auth.authState)

  useEffect(() => {
    peer.on("open", (id) => {
      dispatch(
        setCurrentPeerID({
          currentPeerID: id,
        })
      );
      socket.emit("clientsend", id);
    });

    peer.on("connection", (conn) => {
      conn.on("data", (data) => {
        console.log("Received from", conn.peer, data);
      });
    });
  }, []);

  useEffect(() => {
    socket.on("serversend", (data) => {
      console.log("other peerID", data);
    });
  }, []);

  const sentmessage = (connection) => {
    connection.send(message);
  };

  const routes = useRoutes([
    {
      path:"/",
      element: <EntryPage />
    },{
      path:"/homemessage",
      element: <HomeMessage />
    },
  ])
  
  return routes
  // return (
  //   <Routes>
  //     <Route exact path="/" element={EntryPage}></Route>
  //     <Route exac path="/homemessage" element={HomeMessage}></Route>
  //   </Routes>
  // )
}

export default App;
