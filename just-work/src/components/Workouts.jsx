import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Comment from "./Comment";
import axios from "axios";

function Workouts() {
  const [workoutData, setWorkoutData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [intensity, setIntensity] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getAllWorkouts")
      .then((res) => {
        console.log(res.data);
        setWorkoutData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <p>{"logged in as user " + localStorage.getItem("username")}</p>
      <div>
        {workoutData.map((workout, index) => {
          const { workout_id, name } = workout;
          return (
            <div key={index}>
              <h1>{name}</h1>
              <div>{workout_id}</div>
              <Link to={`/workouts/${workout_id}`}>see more</Link>
            </div>
          );
        })}
      </div>
      <Comment commentData={commentData} setCommentData={setCommentData} />
      <h1>Create your own workout</h1>
      <form
        onSubmit={() => {
          const id = localStorage.getItem("id");
          axios
            .post("http://localhost:8000/api/createWorkout", {
              workoutName,
              intensity,
              workoutDescription,
              id,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        workout name
        <input
          type="text"
          onChange={(e) => {
            setWorkoutName(e.target.value);
          }}
        />
        intensity
        <input
          type="text"
          onChange={(e) => {
            setIntensity(e.target.value);
          }}
        />
        <input
          type="textarea"
          onChange={(e) => {
            setWorkoutDescription(e.target.value);
          }}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
}

export default Workouts;
