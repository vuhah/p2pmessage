import axiosInstance from "../config/axiosconfig";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import "../assets/styles/chatbox.css";
import avt from "../assets/images/avt.png";
import i from "../assets/images/2.png";
import Message from "./message";
import send from "../assets/images/3.png";

function arrayBufferToBase64(Arraybuffer, Filetype, fileName) {
  let binary = '';
  const bytes = new Uint8Array(Arraybuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const file = window.btoa(binary);
  const mimType = Filetype === 'pdf' ? 'application/pdf' : Filetype === 'xlsx' ? 'application/xlsx' :
    Filetype === 'pptx' ? 'application/pptx' : Filetype === 'csv' ? 'application/csv' : Filetype === 'docx' ? 'application/docx' :
      Filetype === 'jpg' ? 'application/jpg' : Filetype === 'png' ? 'application/png' : '';
  const url = `data:${mimType};base64,` + file;
  return (<a href={url} download={fileName}>{fileName}</a>)
}

export default function ChatBox({ peer, setTrigger }) {
  const partnerid = useSelector((state) => state.chat.chatPartnerID);
  const listUser = useSelector((state) => state.chat.listUsers);
  const connections = useSelector((state) => state.peer.connections);
  const [messages, setMessages] = useState([]);
  const peerID = connections.get(partnerid);
  const peerInstance = useRef(null);
  const [typingMessage, setTypingMessage] = useState("");
  const [roomID, setRoomID] = useState("");
  const myID = useSelector((state) => state.auth.userID);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    if (partnerid !== "") {

      async function getRoomInfo() {
        try {
          const res = await axiosInstance.get(`room/${partnerid}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get("jwtAccessToken")}`,
            },
          });
          setRoomID(res.data._id.toString());
          setMessages(res.data.messages);
          return res.data.messages;
        } catch (err) {
          console.log(err);
        }
      }
      getRoomInfo();

      peer.on("connection", function (conn) {
        conn.on("data", function (data) {
          console.log("Received", data);
          if (data.type === "message") {
            console.log(data.data);
            setMessages((prev) => [...prev, data.data]);
            setTrigger((prev) => !prev);
          }
          if (data.type === "file") {
            const datatmp = {
              message: arrayBufferToBase64(data.data, data.filetype, data.filename),
              timestamp: new Date(),
              sender: partnerid,
            };
            console.log(datatmp);
            setMessages((prev) => [...prev, datatmp]);
            setTrigger((prev) => !prev);
          }
          
        });
      });

      peerInstance.current = peer;
    }
  }, [partnerid]);

  const handleSent = (e) => {
    e.preventDefault();
    const conn = peerInstance.current.connect(peerID);
    // console.log(conn.peer);

    if (conn.peer !== undefined) {
      conn.on("open", function () {
        conn.send({
          type: "message",
          data: {
            message: typingMessage,
            timestamp: new Date(),
            sender: myID,
          },
        });
        async function storeMessage() {
          try {
            const res = await axiosInstance.post(
              `room/storeMessage`,
              {
                roomID: roomID,
                message: typingMessage,
              },
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get("jwtAccessToken")}`,
                },
              }
            );
          } catch (err) {
            console.log(err);
          }
        }
        storeMessage();
        setMessages((prev) => [
          ...prev,
          {
            message: typingMessage,
            timestamp: new Date(),
            sender: myID,
          },
        ]);
      });
    } else {
      async function storeMessage() {
        try {
          const res = await axiosInstance.post(
            `room/storeMessage`,
            {
              roomID: roomID,
              message: typingMessage,
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("jwtAccessToken")}`,
              },
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
      storeMessage();
      setMessages((prev) => [
        ...prev,
        {
          message: typingMessage,
          timestamp: new Date(),
          sender: myID,
        },
      ]);
    }
    setTypingMessage("");
    setTrigger((prev) => !prev);
  };

  const handleSelectFile = (e) => {
    e.preventDefault();
    setFiles(e.target.files);
  };

  const handleSendFile = (e) => {
    e.preventDefault();
    const conn = peerInstance.current.connect(peerID);
    if (conn.peer !== undefined) {
      conn.on("open", function () {
        conn.send({
          type: "file",
          data: files[0],
          filename: files[0].name,
          filetype: files[0].type,
        });
      });
      console.log(files[0]);
      setMessages((prev) => [
        ...prev,
        {
          message: <a href={URL.createObjectURL(files[0])} download={files[0].name}>{files[0].name}</a>,
          timestamp: new Date(),
          sender: myID,
        },
      ]);
    }
  };


  if (partnerid)
    return (
      <div className="chatbox ps-5 pe-5 position-relative">
        <div className="chatbox-header d-flex align-items-center justify-content-between pt-3 ">
          <div className="h-100">
            <img src={avt} alt="" className="h-100" />
            <p className="d-inline ms-4 name">{listUser.get(partnerid)}</p>
          </div>
          <img src={i} alt="" className="h-50" />
        </div>
        <hr className="br" />
        <div className="chatbox-body style-1 mb-1 ">
          {messages.map((mess, index) => (
            <Message
              key={index}
              content={mess.message}
              sender={mess.sender === partnerid}
            />
          ))}
        </div>
        <div className="mb-1 w-25 file ps-4 ms-4 d-flex">
          <input
            className="form-control"
            type="file"
            id="formFile"
            
            onChange={(e) => handleSelectFile(e)}
          />
          <img
            onClick={(e) => handleSendFile(e)}
            type="button"
            src={send}
            alt=""
            className="pb-2"
          />
        </div>
        <div className="chatbox-typingMessage">
          <input
            className="inputtext ps-5"
            type="text"
            value={typingMessage}
            onChange={(e) => setTypingMessage(e.target.value)}
            placeholder="Type your message"
          />
          <img
            onClick={(e) => handleSent(e)}
            type="button"
            src={send}
            alt=""
            className="pb-2"
          />
        </div>
      </div>
    );
  else return <></>;
}
