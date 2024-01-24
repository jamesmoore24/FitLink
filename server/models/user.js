const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  googleid: String,
  profile_picture: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  friends: {
    type: [FriendSchema],
    default: [],
  },
  googleid: String,
  profile_picture: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
