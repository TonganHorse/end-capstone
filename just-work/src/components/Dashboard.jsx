import React from "react";
import { Routes, Route } from "react-router-dom";
import Workouts from "./Workouts";

function Dashboard() {
  return (
    <div>
      <Routes>
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
