import axios from "axios";
import React, { useState, useEffect } from "react";

function Postreply({ commentId }) {
  const [replies, setReplies] = useState([]);
  const [replyInput, setReplyInput] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getReplies/${commentId}`)
      .then((res) => {
        setReplies(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const userId = localStorage.getItem("id");
          axios
            .post("http://localhost:8000/api/postReply", {
              replyInput,
              userId,
              commentId,
            })
            .then(() => window.location.reload())
            .catch((err) => console.log(err));
        }}
      >
        <div>
          Replies:
          {replies.map((item, index) => {
            const { username, reply, fullname } = item;
            return (
              <div key={index}>
                <div className="map-container">
                  <div>{username}</div>
                  <div>{reply}</div>
                </div>
              </div>
            );
          })}
          <div className="reply-container">
            <textarea onChange={(e) => setReplyInput(e.target.value)} />
            <br />

            <button type="submit">Comment</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Postreply;
