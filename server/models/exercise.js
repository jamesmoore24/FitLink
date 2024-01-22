const mongoose = require("mongoose");

//define a message schema for the database
const setSchema = new mongoose.Schema({
  reps: Number,
  weight: Number,
  rpe: Number,
});

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  parent: String, //what workout it is underneath
  sets: {
    type: [setSchema],
    default: [],
  },
});

// compile model from schema
module.exports = mongoose.model("exercise", ExerciseSchema);
