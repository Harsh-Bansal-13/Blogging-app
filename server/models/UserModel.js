const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  senderEmail: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  notifications: [NotificationSchema],
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
