import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post(`http://localhost:8000/api/register`, {
              username,
              email,
              password,
              fullname,
            })
            .then((res) => {
              localStorage.setItem("username", res.data[0][0].username);
              localStorage.setItem("email", res.data[0][0].email);
              localStorage.setItem("id", res.data[0][0].user_id);
              navigate("/login");
            })
            .catch((err) => {
              setError(err.res.data);
            });
        }}
      >
        <div className="map-container">
          <h1>Fullname:</h1>
          <input
            type="text"
            onChange={(e) => {
              setFullname(e.target.value);
              setTyping(true);
            }}
          />
          <div>{!fullname ? "Please enter your full name" : null}</div>
          <h1>Username:</h1>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
              setTyping(true);
            }}
          />
          <div>
            {username && username.length < 5 && typing
              ? "Username must contain more than 5 characters"
              : null}
          </div>
          <h1>Password:</h1>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setTyping(true);
            }}
          />
          <div>
            {password && password.length < 8 && typing
              ? "Password must be longer than 8 characters"
              : null}
          </div>
          <h1>Email:</h1>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
              setTyping(true);
            }}
          />
          <div>{!email ? "Must enter a valid email" : null}</div>
          <button type="submit">Register</button>
        </div>
      </form>
      <p>
        Already have an account? login{" "}
        <Link className="link" to="/login">
          here
        </Link>
      </p>
      <div>{error}</div>
    </div>
  );
};

export default Register;
