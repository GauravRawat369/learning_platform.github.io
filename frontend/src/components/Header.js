import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
const Header = (props) => {
    const { authenticated, setAuthenticated } = props;
    const navigate = useNavigate();
    const logoutFun = () => {
        // localStorage.removeItem("token");
        setAuthenticated(false);
        navigate('/');
      }
  return (
    <div className="navbar-parent-div">
          
        <div className='navbar'>
            <h2>
              Grow<span>Me</span>
            </h2>
            <div className='elements-list'>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                {authenticated ? (<Link to='/products'>Products</Link>) : (<Link to='/login'>Products</Link>)}
                </li>
                <li>
                  {authenticated ? (<Link to='/services'>Services</Link>) : (<Link to='/login'>Services</Link>)}
                </li>
                <li>
                  {authenticated ? ( <Link to='/contact'>Contact</Link>) : (<Link to='/login'>Contact</Link>)}
                </li>
              </ul>
            </div>

            <div className="auth-div">
              {!authenticated ? <>
                <Link to="/login">
              <button className='auth-button'>Login </button></Link>
              <Link to="/signup">
              <button className='auth-button'>Signup</button></Link></>
              : 
              <button className='auth-button' onClick={logoutFun}>Logout</button>
              }
            </div>
          </div>
        </div>
  )
}

export default Header