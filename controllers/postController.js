const Post = require("../models/Post");
exports.readAllPostWithUsers = async (req, res) => {
  try {
    const posts = await Post.find().populate("userIds");

    return res.status(400).json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createPostWithUsers = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      userIds: req.body.userIds, // This would be an array of author IDs
    });

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).send(error);
  }
};
