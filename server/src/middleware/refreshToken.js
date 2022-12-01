import jwt from "jsonwebtoken";
import { UserService } from "../services/userService.js";
import config from "../../config/config.js";
import { ResponseHandler } from "../constants/response.js";

export function refreshToken(req, res, next) {
  if (req.message == "jwt expried accessToken") {
    const refreshToken = req.cookies.jwtRefreshToken;
    jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        if (err.message == "jwt expired") {
          res.send(ResponseHandler.RefreshTokenHasExpried);
        }
        if (err.message == "jwt malformed") {
          res.send(ResponseHandler.RefreshTokenInvalid);
        }
        if (UserService.existRefreshToken === null) {
          res.send(ResponseHandler.RefreshTokenNotFound);
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
        req.id = payload.id;
      }
    });
  }
  next();
}
