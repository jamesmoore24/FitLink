const mongoose = require("mongoose");

//define a message schema for the database
const ExerciseSchema = new mongoose.Schema({
  type: String,
  parent: String, //what workout it is underneath
  sets: String[{ reps: Number, weight: Number }],
});

// compile model from schema
module.exports = mongoose.model("exercise", ExerciseSchema);
