const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
  email: String,
});

const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel;
