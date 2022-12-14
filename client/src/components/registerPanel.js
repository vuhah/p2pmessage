import "../assets/styles/registrationForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { switchIntro, switchLoginPanel } from "../redux/entryPageSlice.js";
import axiosInstance from "../config/axiosconfig";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import md5 from "md5"

const notifyRegisterSuccess = () =>
  toast.success("🦄 Register Successfully!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const notifyExistUsername = () =>
  toast.error("🦄 Username already exist!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

export default function RegisterPanel() {
  const [typingDisplayName, setTypingDisplayName] = useState("");
  const [typingUsernanem, setTypingUsername] = useState("");
  const [typingPassword, setTypingPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/register", {
        username: typingUsernanem,
        password: md5(typingPassword),
        displayName: typingDisplayName,
      });
      if (res.data.message === "Username already exist!") {
        notifyExistUsername();
      }
      if (res.data.message === "Register Successfully") {
        notifyRegisterSuccess();
        Cookies.set("jwtAccessToken", res.data.accessToken, {
          expires: 1,
        });
      }
    } catch (err) {
      console.log("failed", err);
    }
  };


  return (
    <div className="registrationForm">
      <form>
        <div className="mb-3">
          <label className="form-label">Display Name</label>
          <input
            type="text"
            className="form-control form2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={typingDisplayName}
            onChange={(e) => setTypingDisplayName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control form2"
            aria-describedby="emailHelp"
            value={typingUsernanem}
            onChange={(e) => setTypingUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control form2"
            id="exampleInputPassword1"
            value={typingPassword}
            onChange={(e) => setTypingPassword(e.target.value)}
          />
        </div>
        <button
          className="btn btn-secondary mt-4"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </button>
        <div className="d-flex justify-content-between">
          <button
            className="back d-block"
            onClick={() => dispatch(switchIntro({}))}
          >
            Back
          </button>
          <button
            className="back d-block"
            onClick={() => dispatch(switchLoginPanel({}))}
          >
            LOG IN
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
