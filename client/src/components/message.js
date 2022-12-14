import "../assets/styles/messages.css";
import avt from "../assets/images/avt.png";

export default function Message({ content, sender }) {
  if (sender === false) {
    return (
      <div className="message  w-75 d-flex flex-row-reverse align-items-center float-end mt-2 mb-2">
        <img src={avt} alt="" className="avt-5 h-25 ms-3" />
        <p className="m-0 content message-me ps-3 pe-3 pb-1 pt-1">{content}</p>
      </div>
    );
  } else {
    return (
        <div className="message w-75 d-flex flex-row align-items-center mt-2 mb-2">
        <img src={avt} alt="" className="avt-5 me-3 " />
        <p className="m-0 content message-partner ps-3 pe-3 pb-1 pt-1">{content}</p>
      </div>
    );
  }
}
