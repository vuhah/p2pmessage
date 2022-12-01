import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import { ResponseHandler } from "../constants/response.js";

export const authenticateToken = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  if (accessToken == null) res.send(ResponseHandler.AccessTokenNotFound);

  jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if ((err.message = "jwt expried")) {
        req.message = "jwt expried accessToken";
      }
    }
    if (payload) {
      req.id = payload.id;
    }
  });
  next();
};
