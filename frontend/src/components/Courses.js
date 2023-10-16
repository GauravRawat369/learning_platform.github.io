import React from "react";
import {Link} from "react-router-dom"
import Header from './Header';
import "./comp.css";
import Blog from "./Blog"
import { useEffect ,useState } from "react";

const Courses= (props) =>{
    const { authenticated, setAuthenticated } = props;
    const [posts,setPost] = useState("");
    useEffect(() => {
        fetch('http://localhost:8000/post').then(res =>{
            res.json().then(post=>{
                console.log(post);
                setPost(post);
            })
        })
    },[])
    return(
        <div>
        <Header authenticated={authenticated} setAuthenticated={setAuthenticated}/>
            <div className="courses-div">
            <Link to="/createpost" ><button className="create-post-button">Create Modules</button></Link>
            
            {posts.length > 0 && posts.map(post => (
                <Blog {...post}/>
            ))}
            </div>
        </div>
    );
}

export default Courses 