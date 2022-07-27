import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navigate.css";

const Navigate = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-container">
      <Link className="first-link  link" to="/">
        JUST WORK
      </Link>
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/about">
        About
      </Link>
      <Link className="link" to="/workouts">
        Workouts
      </Link>
      <Link className="link" to="/workouts/savedworkouts">
        Saved
      </Link>
      <div className="flex-link  link">
        <p>{localStorage.getItem("username")}</p>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navigate;
