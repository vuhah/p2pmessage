import { UserService } from "../services/userService.js";

export const profile = async (req, res) => {
  const infoUser = await UserService.findUser(req.id)
  res.status(200).send({
    id: infoUser,
    message: "Access Successfully!",
  });
};

export const listUser = async (req, res) => {
  const displayNames = await UserService.alllUsers(req.id);
  res.status(200).send(displayNames);
};
