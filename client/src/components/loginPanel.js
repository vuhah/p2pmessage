import "../assets/styles/registrationForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { switchRegisterPanel } from "../redux/entryPageSlice.js";
import axiosInstance from "../config/axiosconfig";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAuthState } from "../redux/authSlice";
import md5 from "md5";

const notifyRegisterSuccess = () =>
  toast.success("🦄 Login Successfully!", {
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
  toast.error("🦄 Username or Password is incorrect!", {
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
  const [typingUsernanem, setTypingUsername] = useState("");
  const [typingPassword, setTypingPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: typingUsernanem,
        password: md5(typingPassword),
      });
      console.log(res);
      if (res.data.message === "Username or Password is incorrect!") {
        notifyExistUsername();
      }
      if (res.data.message === "Login Successfully") {
        Cookies.set("jwtAccessToken", res.data.accessToken, {
          // httpOnly: true,
          expires: 1,
        });
        notifyRegisterSuccess();
        dispatch(setAuthState({ authState: true }));
        navigate("/homemessage");
      }
    } catch (err) {
      console.log("failed", err);
    }
  };
 
  return (
    <div className="registrationForm">
      <form>
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
          SIGN IN
        </button>
        <div className="mt-5">
          <span>Does not have account?</span>
          <button
            className="register ms-5"
            onClick={() => dispatch(switchRegisterPanel({}))}
          >
            Register one
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
