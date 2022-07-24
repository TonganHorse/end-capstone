import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post("http://localhost:8000/api/login", { username, password })
            .then(async (res) => {
              console.log(res.data);
              localStorage.setItem("username", res.data.username);
              localStorage.setItem("id", res.data.id);
              localStorage.setItem("email", res.data.email);
              console.log(localStorage);
              props.loginUser();
              navigate("/workouts");
            })
            .catch((err) => {
              setError(err.data);
            });
        }}
      >
        username
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        password
        <input
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">login</button>
      </form>
      <p>
        No Account? sign up <Link to="/register">here</Link>
      </p>
      <div>{error}</div>
    </div>
  );
}

export default Login;
