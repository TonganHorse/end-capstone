import axios from "axios";
import React, { useState, useEffect } from "react";

const Comment = ({ commentData, setCommentData }) => {
  const [compose, setComposition] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getAllComments")
      .then((res) => {
        setCommentData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>
        {commentData.map((comment) => {
          return (
            <div key={comment.comment_id}>
              <div>{comment.username}</div>
              <div>{comment.comment}</div>
            </div>
          );
        })}
      </div>
      <div>
        <form
          onSubmit={(e) => {
            const id = localStorage.getItem("id");
            e.preventDefault();
            axios
              .post("http://localhost:8000/api/postComment", {
                id,
                compose,
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <input
            type="textarea"
            onChange={(e) => {
              setComposition(e.target.value);
            }}
          />
          <button type="submit">comment</button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
