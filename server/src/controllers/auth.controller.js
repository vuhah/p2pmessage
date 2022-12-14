import { UserService } from "../services/userService.js";
import { ResponseHandler } from "../constants/response.js";
import mongoose from "mongoose";

export const register = async (req, res) => {

  const { username, password, displayName } = req.body;
  if ((await UserService.existUsername(username)) !== null) {
    return res.send({message:"Username already exist!"});
  }

  const _id = new mongoose.Types.ObjectId();

  const accessToken = UserService.generateAccessToken(_id.toString());
  // const refreshToken = UserService.generateRefreshToken(_id.toString());

  const user = await UserService.createUser(
    _id,
    username, 
    password,  
    displayName, 
    // refreshToken
  ); 

  res.send({
    message: "Register Successfully",
    accessToken: accessToken,
    // refreshToken: refreshToken,
  }); 
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserService.verifyAccount(username, password);

  if (user === null) {
    res.send(ResponseHandler.UserDoesNotExist);
    return;
  }

  const accessToken = UserService.generateAccessToken(user.id.toString());
  // const refreshToken = UserService.generateRefreshToken(user.id.toString());

  // UserService.updateRefreshToken(user._id, refreshToken);
  res.send({
    message: "Login Successfully",
    accessToken: accessToken,
    // refreshToken: refreshToken,
  });
};

export const logout = async (req, res) => {
  res.clearCookie("jwtAccessToken");
  res.clearCookie("jwtRefreshToken");
  res.send("Logout successfullyssss");
};
