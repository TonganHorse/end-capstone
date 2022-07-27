import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login({ loginUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login:</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post("http://localhost:8000/api/login", { username, password })
            .then(async (res) => {
              localStorage.setItem("username", res.data.username);
              localStorage.setItem("id", res.data.id);
              localStorage.setItem("email", res.data.email);
              loginUser();
              navigate("/workouts");
            })
            .catch((err) => {
              setError(err.data);
            });
        }}
      >
        <div className="map-container">
          <h1>Username</h1>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <h1>Password</h1>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type="submit">login</button>
        </div>
      </form>
      <p>
        No Account? sign up{" "}
        <Link className="link" to="/register">
          here
        </Link>
      </p>
      <div>{error}</div>
    </div>
  );
}

export default Login;
