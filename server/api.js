/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const multer = require("multer");
const axios = require("axios");
const upload = multer({ dest: "uploads/" });

// import models so we can interact with the database
const User = require("./models/user");
const Comment = require("./models/comment");
const Exercise = require("./models/exercise");
const Workout = require("./models/workout");
const Like = require("./models/like");
const Star = require("./models/star");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/workout/current", (req, res) => {
  Workout.find({ creator_id: req.query.userId, current: true }).then((workout) => {
    res.send(workout);
  });
});

router.post("/workout/create", (req, res) => {
  const newWorkout = new Workout({
    creator_id: req.user._id,
    creator_name: req.user.name,
    current: req.body.current,
  });
  newWorkout.save().then((workout) => {
    res.send(workout);
  });
});

router.post("/workout/save", (req, res) => {
  Workout.findById(req.body.id).then((workout) => {
    workout.posted = false;
    workout.current = false;
    workout.save(res.send(workout));
  });
});

router.post("/workout/post", (req, res) => {
  Workout.findById(req.body.id).then((workout) => {
    workout.posted = true;
    workout.current = false;
    workout.save(res.send(workout));
  });
});

router.post("/workout/delete", (req, res) => {
  Workout.deleteOne({ _id: req.body.workout_id }).then((workout) => {
    console.log(workout);
    res.send(workout);
  });
  Exercise.deleteMany({ parent: req.body.workout_id }).then((workout) =>
    console.log("Recursive exercises deleted")
  );
  Comment.deleteMany({ parent: req.body.workout_id }).then((workout) =>
    console.log("Recursive comment delete")
  );
  Like.deleteMany({ workoutId: req.body.workout_id }).then((workout) =>
    console.log("Recursive like delete")
  );
  Star.deleteMany({ workoutId: req.body.workout_id }).then((workout) =>
    console.log("Recursive star delete")
  );
});

router.get("/workouts/feed", (req, res) => {
  Workout.find({ posted: true }).then((workouts) => res.send(workouts));
});

router.get("/workouts/profile", (req, res) => {
  Workout.find({ creator_id: req.user._id, current: false }).then((workouts) => res.send(workouts));
});

router.get("/exercises/year", (req, res) => {
  let dateToCompare = new Date();
  dateToCompare.setFullYear(dateToCompare.getFullYear() - 1);
  Exercise.find({ creator_id: req.query.creator_id })
    .then((exercises) => {
      res.send(exercises);
    })
    .catch((err) => {
      console.error("Error during query:", err);
    });
});

router.get("/exercises", (req, res) => {
  Exercise.find({ parent: req.query.parent }).then((exercises) => res.send(exercises));
});

router.get("/exercise", (req, res) => {
  Exercise.findById(req.query.id).then((exercise) => res.send(exercise));
});

router.post("/exercise/create", (req, res) => {
  const newExercise = new Exercise({
    creator_id: req.body.creator_id,
    parent: req.body.workoutId,
  });
  newExercise.save().then((exercise) => {
    res.send(exercise);
  });
});

router.post("/exercise/delete", (req, res) => {
  Exercise.deleteOne({ _id: req.body.exerciseId }).then((exercise) => {
    console.log(exercise);
    res.send(exercise);
  });
});

router.post("/exercise/update", (req, res) => {
  Exercise.findById(req.body.id).then((exercise) => {
    exercise.name = req.body.name;
    exercise.sets = req.body.sets;
    exercise.save().then(res.send(exercise));
  });
});

router.get("/exercise/name", (req, res) => {
  Exercise.findById(req.query.id).then((exercise) => {
    res.send(exercise);
  });
});

router.post("/comment", (req, res) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent, // links to the _id of a parent workout (_id is an autogenerated field by Mongoose).
    content: req.body.content,
  });
  newComment.save().then((comment) => {
    res.send(comment);
  });
});

router.get("/comments", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => res.send(comments));
});

router.post("/like", (req, res) => {
  if (req.body.isLiked) {
    const like = new Like({
      userId: req.user._id,
      workoutId: req.body.workoutId,
    });
    like.save().then((like) => console.log("like saved"));
  } else {
    Like.deleteOne({
      userId: req.user._id,
      workoutId: req.body.workoutId,
    }).then(() => console.log("like deleted"));
  }
});

router.get("/like", (req, res) => {
  Like.find({ userId: req.query.userId, workoutId: req.query.workoutId }).then((like) => {
    res.send(like);
  });
});

router.post("/star", (req, res) => {
  console.log(`HERE ${req.body.workoutId}`);
  if (req.body.isStarred) {
    const star = new Star({
      userId: req.user._id,
      workoutId: req.body.workoutId,
    });
    star.save().then((star) => console.log("Star saved"));
  } else {
    Star.deleteOne({
      userId: req.user._id,
      workoutId: req.body.workoutId,
    }).then(() => console.log("Star deleted"));
  }
});

router.get("/star", (req, res) => {
  Star.find({ userId: req.query.userId, workoutId: req.query.workoutId }).then((star) => {
    res.send(star);
  });
});

router.get("/nukedb", (req, res) => {
  Comment.deleteMany({}).then((comments) => {});
  Exercise.deleteMany({}).then((comments) => {});
  Like.deleteMany({}).then((comments) => {});
  Star.deleteMany({}).then((comments) => {});
  User.deleteMany({}).then((comments) => {});
  Workout.deleteMany({}).then((comments) => {});
});

router.post("/user/update", (req, res) => {
  console.log(req.user._id);
  User.findById(req.user._id).then((user) => {
    user.name = req.body.name;
    user.bio = req.body.bio;
    console.log(user);
    user.save().then((user) => res.send(user));
  });
});

router.post("/image/upload", async (req, res) => {
  fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: "Client-ID a670efe26c0f9b7",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: req.body.file, // Assuming this is a base64 encoded string
      type: "base64",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Imgur API responded with status: ${response}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.success) {
        throw new Error("Failed to upload image to Imgur");
      }
      User.findById(req.user._id).then((user) => {
        user.profile_picture = data.data.link;
        user.save().then((user) => res.send(user));
      });
    })
    .catch((error) => {
      console.error("Here Error:", error);
      res.status(500).send("An error occurred");
    });
});

router.get("/user/info", (req, res) => {
  User.findById(req.user._id).then((user) => res.send(user));
});

router.get("/user/profile-picture", (req, res) => {
  User.findById(req.query.creator_id).then((user) => res.send(user));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
