//@ts-nocheck
import axios from "axios";
import React, { useState, useEffect } from "react";
import Postreply from "./Postreply";
import Postcomment from "./Postcomment";

const Comment = ({ commentData, setCommentData }) => {
  const [compose, setComposition] = useState("");
  const [replyClick, setReplyClick] = useState(false);

  const [button, setButton] = useState(0);

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
      <div className="map-container">
        {commentData.map((comment, index) => {
          return (
            <div key={comment.comment_id}>
              <div className="map-container">
                <div>{comment.username}</div>
                <div>{comment.comment}</div>
              </div>
              <button
                id={index}
                onClick={(e) => {
                  setReplyClick(true);
                  setButton(+e.target.id);
                }}
              >
                Reply
              </button>
              <div>
                {replyClick && button === index && (
                  <div>
                    <Postreply commentId={comment.comment_id} />
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
      <Postcomment compose={compose} setComposition={setComposition} />
    </div>
  );
};

export default Comment;
