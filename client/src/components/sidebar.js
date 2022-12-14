import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../config/axiosconfig";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../assets/styles/sidebar.css";
import avt from "../assets/images/avt.png";
import Vector from "../assets/images/Vector.png";
import SearchResult from "./searchresult";
import { setChatPartnerID } from "../redux/chatSlice";
import { useNavigate } from "react-router-dom";
import { setListUser } from "../redux/chatSlice";

export default function SideBar({trigger}) {
  const [typingSearch, setTypingSearch] = useState("");
  const [listRooms, setListRooms] = useState([]);
  const [addFriend, setAddFriend] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listUsers = useSelector((state) => state.chat.listUsers);
  const userID = useSelector((state) => state.auth.userID);
  const userDisplayName = useSelector((state) => state.auth.userDisplayName);

  useEffect(() => {
    async function getUsersList() {
      try {
        const res = await axiosInstance.get("user/listUser", {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwtAccessToken")}`,
          },
        });
        for (const element of res.data) {
          dispatch(
            setListUser({
              id: element._id,
              displayName: element.displayName,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUsersList();
  }, []);

  useEffect(() => {
    async function getRooms() {
      try {
        const res = await axiosInstance.get("room/listRoom", {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwtAccessToken")}`,
          },
        });
        const listRoomTemp = [];
        
        for (const element of res.data) {
          const newDate = new Date(element.messages[element.messages.length-1].timestamp)
          const tempdata = {
            roomid: element._id.toString(),
            user: element.users[0] === userID ? element.users[1] : element.users[0],
            message: element.messages[element.messages.length - 1].message,
            timelastMessage: newDate.getHours() + ":" + newDate.getMinutes()
            // timelastMessage: newDate
          };
          listRoomTemp.push(tempdata);
        }
        setListRooms([...listRoomTemp]);
      } catch (err) {
        console.log(err);
      }
    }
    getRooms();
  }, [addFriend, userID, listUsers, trigger]);

  const openChat = (e, userID) => {
    e.preventDefault();
    dispatch(setChatPartnerID({ chatPartnerID: userID }));
    navigate(`/homemessage/${userID}`);
  };
  return (
    <div className="sidebar ps-3 pt-2">
      <div className="d-flex align-items-center mt-2 ms-2">
        <img src={avt} alt="" className="avt" />
        <div className="ms-4">
          <p className="m-0 username">{userDisplayName}</p>
          <p className="m-0">My account!</p>
        </div>
      </div>
      <input
        type="text"
        value={typingSearch}
        onChange={(e) => setTypingSearch(e.target.value)}
        placeholder="Search"
        className="mt-4 search ps-4 w-75"
      />
      <img src={Vector} alt="" className="ms-4" />
      <SearchResult
        keyword={typingSearch}
        addFriend={setAddFriend}
        setkeyword={setTypingSearch}
      />
      <div className="listmessage mt-3 pt-3 style-1">
        {listRooms.map((room, index) => (
          <div
            className="d-flex align-items-center ps-3 mb-3 userbox pt-1 pb-1"
            key={index}
            onClick={(e) => openChat(e, room.user)}
          >
            <img src={avt} alt="" className="avt" />
            <div className="ms-3">
              <p className="name m-0">{listUsers.get(room.user)}</p>
              <p className="m-0">{room.message}</p>
            </div>
            <div className="lasttime ms-auto me-4 mb-4 ">{room.timelastMessage}</div>
          </div>
        ))}
      </div>
      <p className="copyright mt-3">Team Rocket - Computer Network - HCMUT </p>
    </div>
  );
}
