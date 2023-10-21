import React from "react";
import "./comp.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const { authenticated, setAuthenticated, usertype, setUsertype } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const signup = (e) => {
    e.preventDefault();
    // console.log(user);
    axios
      .post("http://localhost:8000/signup", { email, password, usertype,username })
      .then((res) => {
        console.log(res);
        setAuthenticated(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="signin-page">
      <div className="signin-div">
        <form onSubmit={signup}>
          <div className="signin-text">
            <h3>Sign Up</h3>
          </div>
          <div className="mb-3 ">
            <select
              name="User"
              id="user-type"
              onChange={(e) => setUsertype(e.target.value)}
            >
              <option value="">Select One</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="mb-1">First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="mb-1">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="mb-1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary button-style">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
