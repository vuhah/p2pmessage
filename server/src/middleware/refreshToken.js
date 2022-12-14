import jwt from "jsonwebtoken";
import { UserService } from "../services/userService.js";
import config from "../../config/config.js";
import { ResponseHandler } from "../constants/response.js";

export function refreshToken(req, res, next) {
  if (req.message === "invalid access token") {
    const refreshToken = req.headers.cookies;

    jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        if (err.message === "jwt expired") {
          res.send("RefreshToken has expried!")
        }
        if (err.message === "jwt malformed") {
          res.send("RefreshToken is invalid");
        }
        if (UserService.existRefreshToken === null) {
          res.send("RefreshToken is not found!");
        }
        res.clearCookie("jwtAccessToken");
        res.clearCookie("jwtRefreshToken");
      }
      if (payload) {
        const accessToken = UserService.generateAccessToken(payload.id);
        res.cookie("jwtAccessToken", accessToken, {
          httpOnly: true,
          maxAge: 12000,
        });
        req.accessToken = accessToken
        req.id = payload.id;
      }
    });
  }

  next();
}
