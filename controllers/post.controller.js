import Friend from "../models/Friends.js";
import Post from "../models/Post.js";
import Users from "../models/Users.js";

//Create Post 
const create = async (req, res) => {
  const { heading, message, visibility } = req.body;
  if (!heading || !message) {
    return res.status(400).json({ message: "All data is required" });
  }
  try {
    const post = await Post.create({
      userId: req.session.user.id,
      heading,
      message,
      visibility: visibility === true,
    });
    res.json(post);
  } catch (e) {
    res.status(500).json({ message: "Something went Wrong" });
  }
};

//Get the post
const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!post.visibility && post.userId != req.session.user.id) {
      const friend = await Friend.findOne({
        where: {
          user1: req.session.user.id,
          user2: post.userId,
        },
      });
      console.log(friend);
      if (!friend) {
        return res
          .status(403)
          .json({ message: "You are not authorized to view this post" });
      }
    }

    res.json(post);
  } catch (e) {
    res.status(500).json({ message: "Something went Wrong" });
  }
};


export {
  create,

};
