import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Workout() {
  const [workout, setWorkout] = useState([]);
  const param = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getAllWorkouts")
      .then((res) => {
        const selectedWorkout = res.data.filter(
          (item) => +item.workout_id === +param.id
        );
        setWorkout(selectedWorkout);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        {workout.map((workout) => {
          const { workout_id, description, intensity, name, username } =
            workout;
          return (
            <div key={workout_id}>
              <div>Workout posted by {username}</div>
              <div>{name}</div>
              <div>{intensity}</div>
              <div>{description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Workout;
