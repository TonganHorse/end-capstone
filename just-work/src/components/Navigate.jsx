import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navigate.css";

const Navigate = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-container">
      <Link className="first-link  link" to="/">
        JUST WORK
      </Link>

      <Link className="navlink" to="/about">
        About
      </Link>
      <Link className="navlink" to="/workouts">
        Workouts
      </Link>
      <Link className="navlink" to="/workouts/savedworkouts">
        Saved
      </Link>
      <div className="navlink flex-link">
        <p>{localStorage.getItem("username")}</p>
        <button
          onClick={() => {
            localStorage.clear();
            setIsLoggedIn(false);
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
