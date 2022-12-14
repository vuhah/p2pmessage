import { user } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import { hashSync, genSaltSync, compareSync } from "bcrypt";

export class UserService {
  static salt = genSaltSync(10);

  static existUsername = async (username) => {
    return await user.findOne({
      username: username,
    });
  };

  static verifyAccount = async (username, password) => {
    const existUsername = await user.findOne({
      username: username,
    });
    if (existUsername && compareSync(password, existUsername.password))
      return existUsername;
    return null;
  };

  static generateAccessToken = (id) => {
    return jwt.sign({ id: id }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: "20m",
    });
  };

  static generateRefreshToken = (id) => {
    return jwt.sign({ id: id }, config.REFRESH_TOKEN_SECRET, {
      expiresIn: "20m",
    });
  };

  static createUser = async (
    _id,
    username,
    password,
    displayName,
    refreshToken
  ) => {
    const hashedPassword = hashSync(password, UserService.salt);
    return await user.create({
      _id: _id,
      username: username,
      password: hashedPassword,
      displayName: displayName,
      refreshToken: refreshToken,
    });
  };

  static existRefreshToken = async (refreshToken) => {
    return (existRefreshToken = await user.findOne({
      refreshToken: refreshToken,
    }));
  };

  static clearUser = async () => {
    await user.deleteMany({});
  };

  static updateRefreshToken = async (alternativeUserID, refreshToken) => {
    await user.findOneAndUpdate(
      { _id: alternativeUserID },
      { refreshToken: refreshToken }
    );
  };

  static alllUsers = async (userID) => {
    const displayNames = await user.find(
      { _id: { $ne: userID } },
      "_id displayName"
    );
    return displayNames;
  };
  static findUser = async(userID) => {
    const infouser = await user.findOne(
      {_id: userID},
      "_id displayName"
    )
    return infouser
  }
}
