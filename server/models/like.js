const mongoose = require("mongoose");

//define a message schema for the database
const LikeSchema = new mongoose.Schema({
  userId: String,
  postId: String,
});

// compile model from schema
module.exports = mongoose.model("like", LikeSchema);
