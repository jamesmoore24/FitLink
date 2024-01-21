const mongoose = require("mongoose");

//define a story schema for the database
const WorkoutSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  timestamp: { type: Date, default: Date.now },
  starred: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
});

// compile model from schema
module.exports = mongoose.model("workout", WorkoutSchema);
