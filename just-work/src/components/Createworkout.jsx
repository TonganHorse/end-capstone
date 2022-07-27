import React from "react";
import axios from "axios";

function Createworkout({
  workoutName,
  intensity,
  workoutDescription,
  setWorkoutDescription,
  setWorkoutName,
  setIntensity,
}) {
  const createWorkoutHandler = (e) => {
    e.preventDefault();
    const id = localStorage.getItem("id");
    axios
      .post("http://localhost:8000/api/createWorkout", {
        workoutName,
        intensity,
        workoutDescription,
        id,
      })
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="create-workout-container">
        <h1>Create your own workout</h1>
        <form onSubmit={createWorkoutHandler}>
          <div>
            <h2>Workout Name</h2>
            <input
              className="textarea"
              type="text"
              onChange={(e) => {
                setWorkoutName(e.target.value);
              }}
            />
          </div>
          <div>
            <h2>Intensity</h2>
            <input
              className="textarea"
              type="text"
              onChange={(e) => {
                setIntensity(e.target.value);
              }}
            />
          </div>
          <div>
            <h2>Description</h2>
            <textarea
              className="textarea"
              onChange={(e) => {
                setWorkoutDescription(e.target.value);
              }}
            />
          </div>
          <button type="submit">Create Workout</button>
        </form>
      </div>
    </div>
  );
}

export default Createworkout;
