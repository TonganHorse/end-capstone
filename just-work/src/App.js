import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Workout from "./components/Workout";
import Savedworkouts from "./components/Savedworkouts";
import { Routes, Route } from "react-router-dom";
import Navigate from "./components/Navigate";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import "./css/App.css";

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
      <div className="body">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              isLoggedIn ? <Dashboard /> : <Login loginUser={loginUser} />
            }
          />
          <Route path="/workouts/:id" element={<Workout />} />
          <Route path="/workouts/savedworkouts" element={<Savedworkouts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
