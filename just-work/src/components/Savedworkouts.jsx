//@ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";

function Savedworkouts() {
  const [saved, setSaved] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getSaved")
      .then((res) => setSaved(res.data))
      .catch((err) => console.error(err));
  }, [deleteMessage]);

  return (
    <div className="map-container">
      {saved.map((saved) => {
        const { name, intensity, username, description } = saved;
        return (
          <div username={username} key={description}>
            <div>{username}</div>
            <div>{name}</div>
            <div>{intensity}</div>
            <div>{description}</div>
            <button
              onClick={() => {
                const { workout_id } = saved;
                axios
                  .delete(`http://localhost:8000/api/deleteSaved/${workout_id}`)
                  .then((res) => alert(res.data))
                  .then((res) => setDeleteMessage(res.data));
              }}
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Savedworkouts;
