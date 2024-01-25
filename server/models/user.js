const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  googleid: String,
  profile_picture: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  bio: { type: String, default: "" },
  friends: {
    type: [FriendSchema],
    default: [],
  },
  googleid: String,
  profile_picture: { type: String, default: "../../public/example_profile.jpg" },
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
