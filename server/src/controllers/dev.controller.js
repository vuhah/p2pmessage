import { UserService } from "../services/userService.js";

export const clearUser = async (req, res) => {
    await UserService.clearUser()
    res.send("clear user")
} 