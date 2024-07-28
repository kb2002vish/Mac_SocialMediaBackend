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




export {
  create,

};
