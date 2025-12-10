const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");


//get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  // return only the authenticated user's workouts
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};
//get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }
  const user_id = req.user._id;
  const workout = await Workout.findOne({ _id: id, user_id });
  if (!workout) {
    //if you dont find any workout
    return res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill in all the fields", emptyFields });
  }
  //add doc to db
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const user_id = req.user._id;
  const workout = await Workout.findOneAndDelete({ _id: id, user_id });

  if (!workout) {
    return res.status(404).json({ error: "no such workout to be deleted" });
  }

  res.status(200).json({ message: "workout deleted successfully", workout });
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const user_id = req.user._id;
  try{
    const workout = await Workout.findOneAndUpdate(
      { _id: id, user_id },
      { ...req.body },
      {new: true, runValidators:true}
    );
  
    if (!workout) {
      return res.status(404).json({ error: "No such workout to update" });
    }
  
    res.status(200).json(workout);
  }catch(error){
    res.status(400).json({error:error.message})
  }
  }

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
