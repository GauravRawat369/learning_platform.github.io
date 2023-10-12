import React, { useEffect } from 'react'
import "./comp.css";
import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LogIn = (props) => {
  const { authenticated, setAuthenticated } = props;
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notlogin,setNotlogin] = useState("");
  const logInpass = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/login',{email,password})
    .then(res => {console.log(res)
      if(res.data === "success")
      {
        setAuthenticated(true);
        navigate('/')
      }
    
    }
    )
    .catch(err => console.log(err));
  };
  return (
    <div className="login-page">

    <div className="login-div">
      <form onSubmit={logInpass} method='post' action='/login'>
        <div className="login-text">
          <h3>Login</h3>
        </div>
        <div className="mb-3">
          <label className="mb-1">Email address</label>
          <input
            method="get"
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
            Login
          </button>
        </div>
        <p className="forgot-password text-right">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
      {notlogin&&<p className="error-text">SignUp First</p>
      }
    </div>
  </div>
    
      );
    }
    

export default LogIn