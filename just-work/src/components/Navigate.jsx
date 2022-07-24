import React from "react";
import { Link } from "react-router-dom";

const Navigate = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/workouts">Workouts</Link>
    </div>
  );
};

export default Navigate;
