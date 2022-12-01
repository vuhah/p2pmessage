import { UserService } from "../services/userService.js";

export const profile = async (req, res) => {
  res.send(req.user);
};

export const listUser = async (req, res) => {
  console.log(req.id);
  const displayNames = await UserService.alllUsers(req.id);
  res.send(displayNames);
};
