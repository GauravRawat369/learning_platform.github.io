import React from 'react'
import Header from './Header';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import './comp.css'

const Postpage = (props) => {
    const { authenticated, setAuthenticated } = props;
    const [ postinfo,setPostinfo] = useState("");
    const {id} = useParams();
    useEffect(()=>{
        fetch(`http://localhost:8000/postpage/${id}`)
        .then(res => res.json())
        .then(data => setPostinfo(data))
    },[])
    console.log(postinfo);
  return (
    <div>
        <Header authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        <div className='postpage-main-div'>
            <div className='postpage-content-div'>
                <h1>{postinfo?.title}</h1>
                <p>Gaurav Rawat <span>{new Date(postinfo?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span> </p>
                
                <p className='summary-text'>{postinfo?.summary}</p>
                <img src={'http://localhost:8000/'+postinfo.coverimg} alt="" />
                <div className='content-text' dangerouslySetInnerHTML={{__html:postinfo.content}}/>
            </div>
        </div>
        
    </div>
  )
}

export default Postpage