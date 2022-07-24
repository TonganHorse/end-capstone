import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Workout from "./components/Workout";
import { Routes, Route } from "react-router-dom";
import Navigate from "./components/Navigate";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginUser = () => setIsLoggedIn(!isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      {isLoggedIn && <Navigate />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={isLoggedIn ? <Dashboard /> : <Login loginUser={loginUser} />}
        />
        <Route path="/workouts/:id" element={<Workout />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
