import chatappIntro from "../assets/images/chatappintro2.png";
import { useDispatch } from "react-redux";
import { switchLoginPanel, switchRegisterPanel } from "../redux/entryPageSlice.js";

export default function Intro() {
  const dispatch = useDispatch();

  return (
    <>
      <img src={chatappIntro} className="d-block" alt="" />
      <button
        type="submut"
        className="button"
        onClick={() => dispatch(switchLoginPanel())}
      >
        <p className="text">LOGIN</p>
      </button>
      <button
        type="submut"
        className="button"
        onClick={() => dispatch(switchRegisterPanel())}
      >
        <p className="text">REGISTER</p>
      </button>


    </>
  );
}
