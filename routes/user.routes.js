import express from "express";
import {
  acceptRequest,
  addFriend,
  allFriends,
  createUser,
  deleteAccount,
  friendRequests,
  login,
  logOut,
} from "../controllers/user.controller.js";
import User from "../models/Users.js";
import authenticate from "../middleware/authenticate.js";
const route = express.Router();

route.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
route.post("/create", createUser);
route.put("/deleteAccount", authenticate, deleteAccount);

route.post("/login", login);
route.get("/logout", logOut);

//Friend routes
route.get("/addFriend/:id", authenticate, addFriend);
route.get("/friendRequest", authenticate, friendRequests);
route.get("/acceptfr/:id", authenticate, acceptRequest);
route.get("/allFriends", authenticate, allFriends);
export default route;
