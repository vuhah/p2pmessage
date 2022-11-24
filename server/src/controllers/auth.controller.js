import { User } from "../models/userModel.js";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export const register = async (req, res) => {
  const { username, password, displayName } = req.body;
  if (!(username && password && displayName)) {
    res.status(400).send("Require user input!");
  }
  const existUser = await User.findOne({ username: username });
  if (existUser) {
    res.status(409).send("User already exist. Please login!");
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);

  const accessToken = jwt.sign(
    { username: username },
    config.ACCESS_TOKEN_SCERET, 
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { username: username },
    config.REFRESH_TOKEN_SCERET,
    { expiresIn: "1h" }
  );
  await User.create({
    password: hashedPassword,
    username,
    displayName,
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 2 * 1000,
  });

  
  return res.send({
    status: "OK",
    accessToken: accessToken,
  });
}; 

export const login = async (req, res) => {
  const { username, password } = req.body;
  const existUser = await User.findOne({ username: username });
  if (existUser) {
    res.status(409).send("User already exist. Please login!");
  }
};
