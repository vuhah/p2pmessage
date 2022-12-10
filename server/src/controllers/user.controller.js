import { UserService } from "../services/userService.js";

export const profile = async (req, res) => {
  res.send(req.user);
};

export const listUser = async (req, res) => {
  const displayNames = await UserService.alllUsers(req.id);
  res.send(displayNames);
};
 