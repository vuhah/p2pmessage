import thumbnail from "../assets/images/THUMBNAIL.png";
import Joi from "joi";
import { useSelector } from "react-redux";
import Intro from "../components/intro";
import LoginPanel from "../components/loginPanel";
import RegisterPanel from "../components/registerPanel";

// const shemaReister = Joi.object({
//   username: Joi.string()
//               .alphanum
//               .min(8)
//               .max(30)
//               .required(),

//   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

//   displayName: Joi.string().min(8).required(),
// });


const mapTabwithCode = new Map([
  ["intro", <Intro/>],
  ["login", <LoginPanel/>],
  ["register", <RegisterPanel/>]
])

export default function EntryPage() {
  const currentTab = useSelector(state => state.entryPage).currentTab
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-around">
          <div className="col-4 text-center">
            <img src={thumbnail} alt="" />
          </div>
          <div className="col-4 chatappintro">
            {mapTabwithCode.get(currentTab)}
          </div>
        </div>
      </div>
    </>
  );
}
