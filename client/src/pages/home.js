import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosconfig";
import Cookies from "js-cookie";
import {
  setAuthState,
  setUserID,
  setUserDisplayName,
} from "../redux/authSlice";
import SideBar from "../components/sidebar";
import { setCurrentPeerID, addConnections } from "../redux/peerSlice";
import Peer from "peerjs";
import { io } from "socket.io-client";
import ChatBox from "../components/chatbox";

export default function HomeMessage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uID = useRef(null);
  const peerInstance = useRef(null)
  const peerConnectionID = useRef(null)

  const connections = useSelector(state=>state.peer.connections)
  
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const socket = io("http://localhost:8000");
    const peer = new Peer();

    async function getID() {
      try {
        const res = await axiosInstance.get("user/profile", {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwtAccessToken")}`,
          },
        });
        if (res.data.message === "Access Successfully!") {
          uID.current = res.data.id._id;
          dispatch(setAuthState({ authState: true }));
          dispatch(setUserID({ userID: res.data.id._id }));
          dispatch(
            setUserDisplayName({ userDisplayName: res.data.id.displayName })
          );
        } else {
          dispatch(setAuthState({ authState: false }));
          navigate("/");
        }
      } catch (err) {
        dispatch(setAuthState({ authState: false }));
        navigate("/");
      }
    }
    getID();

    peer.on("open", async (id) => {
      dispatch(
        setCurrentPeerID({
          currentPeerID: peer.id,
        })
      );
      socket.emit("clientsend", { peerID: peer.id, userID: uID.current });
    });


    socket.on("serversend", (data) => {
      data = data.filter((element) => element.peerID !== peer.id);
      for (const element of data) {
        dispatch(
          addConnections({
            userID: element.userID,
            connection: element.peerID,
          })
        ); 
      } 
    });



    peerInstance.current = peer;

  }, []);



  return (
    <div className="container-fluid p-0">
      <div className="row d-flex justify-content-center">
        <div className="col-3 pe-0">
          <SideBar trigger={trigger}/>
        </div>
        <div className="col-9 ps-0">
          <ChatBox peer={peerInstance.current} setTrigger={setTrigger}/>
        </div>
      </div>
    </div>
  );
}
