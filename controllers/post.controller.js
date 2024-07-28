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

//get all posts
const allPost = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { visibility: true } });
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Delete the post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({
      where: { id },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.userId != req.session.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }
    await Post.destroy({ where: { id } });
    res.json({ message: "Post deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// commenting the post
const comment = async (req, res) => {
  const { id, message } = req.body;
  const userId = req.session.user.id;
  try {
    const post = await Post.findOne({ where: { id } });

    // if the post is private then only friend can like it
    if (!post.dataValues.visibility && post.dataValues.userId != userId) {
      const postUser = await Users.findOne({ where: { id: userId } });
      const friend = postUser.dataValues.friendList;
      //the user who like the post is a friend of the user who post
      if (!(friend && friend.find((e) => e.id == userId && state))) {
        return res
          .status(400)
          .json({ message: "Only friend have access to this post" });
      }
    }

    const comments = post.dataValues.comments;
    if (comments) {
      post.comments = [...comments, { userId: req.session.user.id, message }];
    } else {
      post.comments = [{ userId: req.session.user.id, message }];
    }
    post.save();
    res.json(post);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
export {
  create,

};
