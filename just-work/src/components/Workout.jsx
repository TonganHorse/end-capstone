//@ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Postreply from "./Postreply";

function Workout() {
  const [workout, setWorkout] = useState([]);
  const [commentAtId, setCommentAtId] = useState("");
  const [workoutComment, setWorkoutComment] = useState([]);
  const [replyClick, setReplyClick] = useState(false);
  const [button, setButton] = useState(0);
  const param = useParams();

  useEffect(() => {
    const workoutId = param.id;
    axios
      .get(`http://localhost:8000/api/getWorkoutComments/${workoutId}`)
      .then((res) => {
        setWorkoutComment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      <div className="map-container">
        {workout.map((item) => {
          const { description, intensity, name, username } = item;
          return (
            <div key={description}>
              <div>Workout posted by {username}</div>
              <div>{name}</div>
              <div>{intensity}</div>
              <div>{description}</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const userId = localStorage.getItem("id");
                  const workoutId = param.id;
                  axios
                    .post("http://localhost:8000/api/postCommentAtId", {
                      commentAtId,
                      userId,
                      workoutId,
                    })
                    .then((res) => alert(res.data))
                    .then(() => {
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    })
                    .catch((err) => console.log(err));
                }}
              >
                <div className="map-container">
                  <div>
                    <h1>Comment:</h1>
                    <textarea
                      type="text"
                      onChange={(e) => {
                        setCommentAtId(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <button type="submit">submit</button>
                  </div>
                </div>
              </form>
              <button
                onClick={() => {
                  axios
                    .post(`http://localhost:8000/api/saveWorkout`, workout)
                    .then((res) => {
                      alert(res.data);
                    });
                }}
              >
                Save Workout
              </button>
            </div>
          );
        })}
      </div>
      <div className="map-container">
        {workoutComment.map((item, index) => {
          const { comment, comment_id, user_id, username, fullname } = item;
          return (
            <div key={index}>
              <div className="map-container">
                <h1>{username}</h1>
                <p>{fullname}</p>
                <p>{comment}</p>
              </div>

              <button
                id={index}
                onClick={(e) => {
                  setReplyClick(true);
                  setButton(+e.target.id);
                }}
              >
                reply
              </button>
              <div>
                {replyClick && button === index && (
                  <div>
                    <Postreply commentId={comment_id} />
                    <button
                      onClick={() => {
                        setReplyClick(false);
                      }}
                    >
                      Discard
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Workout;
