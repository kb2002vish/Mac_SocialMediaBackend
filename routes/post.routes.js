import express from "express";
import {
  allPost,
  comment,
  create,
  deletePost,
  friendsPost,
  getMyPosts,
  getPost,
  likePost,
} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", create);
router.get("/posts", allPost);
router.get("/postData/:id", getPost);
router.delete("/delete/:id", deletePost);
router.put("/comment", comment);
router.put("/like/:id", likePost);
router.get("/mypost", getMyPosts);
router.get("/friendposts/:friendId", friendsPost);

export default router;
