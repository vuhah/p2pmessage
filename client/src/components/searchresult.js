import "../assets/styles/sidebar.css";
import avt from "../assets/images/avt.png";
import axiosInstance from "../config/axiosconfig";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export default function SearchResult({ keyword, addFriend, setkeyword }) {
  const listUsers = useSelector((state) => state.chat.listUsers);
  const result = [];
  if (keyword !== "") {
    for (const [key, value] of listUsers) {
      if (value.includes(keyword) === true) {
        result.push({ id: key, displayName: value });
      }
    }
  }
  const addContact = async (e, id) => {
    e.preventDefault();
    setkeyword("");
    try {
      const res = await axiosInstance.post(
        "room/createRoom",
        {
          userID: id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwtAccessToken")}`,
          },
        }
      );
      addFriend((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="searchPanel style-1 mt-1 ">
      {result.map((element, index) => (
        <div
          key={index}
          className="userbox2 ps-3 mt-2 pt-1 pb-1 d-flex align-items-center "
          onClick={(e) => addContact(e, element.id)}
        >
          <img src={avt} alt="" className="avt" />

          <p className="name m-0 ms-3 ">{element.displayName}</p>
        </div>
      ))}
    </div>
  );
}
