import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

function App() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [message, setMessage] = useState("");
  const peerInstance = useRef(null);
  const connection = useRef(null);
  const flagConn = useRef(false);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("connection", (conn) => {
      if (flagConn.current === false) {
        connection.current = peer.connect(conn.peer);
        flagConn.current = true;
      }
      conn.on("data", (data) => {
        console.log("Received", data);
      });
    });

    peerInstance.current = peer;
  }, []);

  const connectPeer = () => {
    flagConn.current = true;
    connection.current = peerInstance.current.connect(remotePeerIdValue);
  };

  const sentmessage = () => {
    connection.current.send(message);
  };

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />

      <button onClick={connectPeer}>Connect</button>

      <br />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sentmessage}>Call</button>
    </div>
  );
}

export default App;
