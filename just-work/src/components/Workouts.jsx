import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Comment from "./Comment";
import Createworkout from "./Createworkout";

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
        setWorkoutData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="map-container">
      <div>
        <h1>Workouts:</h1>
        {workoutData.map((workout, index) => {
          const { workout_id, name } = workout;
          return (
            <div className="map-container" key={index}>
              <h1>{name}</h1>
              <Link className="link" to={`/workouts/${workout_id}`}>
                see more
              </Link>
            </div>
          );
        })}
      </div>
      <h1>Chat:</h1>
      <Comment commentData={commentData} setCommentData={setCommentData} />
      <Createworkout
        workoutName={workoutName}
        intensity={intensity}
        workoutDescription={workoutDescription}
        setWorkoutName={setWorkoutName}
        setIntensity={setIntensity}
        setWorkoutDescription={setWorkoutDescription}
      />
    </div>
  );
}

export default Workouts;
