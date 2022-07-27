import React from "react";
import axios from "axios";

function Postcomment({ compose, setComposition }) {
  return (
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
              alert(res.data);
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <div className="container">
          <textarea
            onChange={(e) => {
              setComposition(e.target.value);
            }}
          />
          <br />
          <button type="submit">comment</button>
        </div>
      </form>
    </div>
  );
}

export default Postcomment;
