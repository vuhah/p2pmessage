import Peer, { ConnectionType } from "peerjs";
import { useState, useEffect } from "react";

const peer = new Peer()
peer.on("open", (userPeerID) => {
  console.log(userPeerID);
});

function App() {
  const [destinationID, setDestinationID] = useState("");
  const [datasent, setDatasent] = useState("");
  const [dataReceive, setDataReceive] = useState("");
  const [conn, setConn] = useState(peer.connect("")) 

  const handleSubmit = () => {
    setConn(peer.connect(destinationID))
    console.log(`connect to ${destinationID} successfully`);
  }

  // useEffect(() => {
  //   conn.on("open", function () {
  //     // Receive messages
  //     conn.on("data", function (data) {
  //       setDataReceive(data)
  //     });

  //     // Send messages
  //     conn.send("Hello!");
  //   });
  // },[]);

  const handleSentData = () => {
    conn.on("open", () => {
      conn.send(datasent)
    })
  }

  return (
    <div>
      <h1>{destinationID}</h1>
      <input type="text" onChange={(e) => setDestinationID(e.target.value)} />
      <button onClick={handleSubmit}>CONNECT</button>
      <input type="text" onChange={e => setDatasent(e.target.value)}/>
      <button onClick={handleSentData}>SENT</button>
      <h2>{dataReceive}</h2>
    </div>
  );
}

export default App;
