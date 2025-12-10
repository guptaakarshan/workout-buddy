import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutDetails = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUTS", payload: json.workout });
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const updatedWorkout = { title, load, reps };

    const response = await fetch("api/workouts/" + workout._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedWorkout),
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "UPDATE_WORKOUTS", payload: json });
      setIsEditing(false);
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps (kg):</strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <div className="icons">
        <span className="material-symbols-outlined delete-icon" onClick={handleDelete}>
          delete
        </span>

        <span
          className="material-symbols-outlined edit-icon"
          onClick={() => setIsEditing(true)}
        >
          edit
        </span>
      </div>

      {isEditing && (
        <form className="edit-form" onSubmit={handleEdit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
          />

          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setTitle(workout.title);
              setLoad(workout.load);
              setReps(workout.reps);
            }}
          >
            Cancel
          </button>
        </div>
        </form>
      )}
    </div>
  );
};
export default WorkoutDetails;
