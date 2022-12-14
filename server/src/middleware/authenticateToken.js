import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export const authenticateToken = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];

  if (accessToken === "undefined") {
    return res.status(400).send("Access Token is not provided!")
  }

  jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      req.message = "invalid access token"
    } 
    if (payload) {
      req.id = payload.id
    }
  }); 
  next();
}; 
 