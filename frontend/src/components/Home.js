import react from 'react'
import {Link} from "react-router-dom"
import student from './images/student-v1.png'
import { useNavigate} from 'react-router-dom';
import Header from './Header';
function Home(props) {
    const { authenticated, setAuthenticated } = props;
    const navigate = useNavigate();
    const findCourses = () => {
      if(authenticated)
      {
        navigate("/privateroute/courses")
      }
      else
      {
        navigate("/login")
        alert("Login first")
      }
    }
    const findVideos = () => {
      if(authenticated)
      {
        navigate("/privateroute/videos")
      }
      else
      {
        navigate("/login")
        alert("Login first")
      }
    }

    return (
      <div className="Home-page">
        <Header authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        <div className="intro-content-div">
          <div className="intro-text-div">
            <div className="inner-intro-text-div">
              <h1>
                <span>Learn</span> with Love
              </h1>
              <h2>
                The Ultimate Guide To Ace <br />
                SDE Interviews.
              </h2>
              <div className="auth-div">

              <button className="auth-button viewcourse-button" onClick={findCourses}>
                View Courses
              </button> 
               <button className="auth-button watch-video-button" onClick={findVideos}>
                Watch Videos
              </button>
              </div>
            </div>
          </div>
          <div className="intro-image-div">
            <img src={student} alt="" />
          </div>
        </div>
      </div>
    );
  }

export default Home
