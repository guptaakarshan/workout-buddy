import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("you must be logged in");
      return;
    }
    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
  
      setEmptyFields(Array.isArray(json.emptyFields) ? json.emptyFields : []);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUTS", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label>Exercise title: </label>

      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={Array.isArray(emptyFields) && emptyFields.includes("title") ? "error" : ""}
      />

      <label>load (in kg): </label>

      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={Array.isArray(emptyFields) && emptyFields.includes("load") ? "error" : ""}
      />

      <label>reps count: </label>

      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={Array.isArray(emptyFields) && emptyFields.includes("reps") ? "error" : ""}
      />

      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default WorkoutForm;
