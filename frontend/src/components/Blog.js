import React from "react";
import "./comp.css";
import {Link} from 'react-router-dom'
export default function Blog ({_id,title,summary,content,blogwriter,coverimg,createdAt
}) {
  return (
    <div className="courses-div-content">
      <div className="image-content">
        <Link to={`/postpage/${_id}`}>
        <img
          src={'http://localhost:8000/'+coverimg}
          alt="module img"
        />
        </Link>
      </div>
      <div className="text-content">
        <Link to={`/postpage/${_id}`}><h2>{title.length > 80 ? title.substring(0,77)+'...' :title} </h2></Link>
        <p className="date-author-details">
        <p>{blogwriter} <span>{new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span> </p>
        </p>
        <p className="module-text">
          {summary.substring(0, 200)+'...'}
        </p>
      </div>
    </div>
  );
};

