import React from 'react'
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import "./create.css"
import {useNavigate } from 'react-router-dom';
const Createpost = (props) => {
    const navigate = useNavigate();
    const{username} = props;
    const [title,setTitle] = useState("");
    const [summary,setSummary] = useState("");
    const [content,setContent] = useState("");
    const [filevalue,setFilevalue] = useState("");
  const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
      const  formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
      console.log(content);
        const sendpost = async (e) => {
            // console.log(title)
            // console.log(summary)
            // console.log(content)
            // console.log(filevalue[0])
            e.preventDefault();
            const formdata = new FormData();
            formdata.append("blogwriter",username);
            formdata.append("title",title);
            formdata.append("summary",summary);
            formdata.append("content",content);
            formdata.append("file",filevalue[0]);
            const response =  await axios.post('http://localhost:8000/createpost',formdata)
            .then(res => {
                console.log(res);
                navigate('/privateroute/courses');
            })
            .catch(err => console.log(err));
            console.log(response)
        }

  return (
    <div className='createpost-content'>
        <form action='post' onSubmit={sendpost}>
            <input type="title" value={title} placeholder={'title'} className='title-class' onChange={e => setTitle(e.target.value)}/>
            <input type="summary" value={summary} placeholder={'Summary'} onChange={e => setSummary(e.target.value)} />
            <input type="file"  onChange={e => setFilevalue(e.target.files)}/>
            <ReactQuill value={content} modules={modules} formats={formats} onChange={newcontent => setContent(newcontent)}/>
        <button style={{
            backgroundColor:'rgb(64,64,64)',
            color:'white',
            width:'100%',
            marginTop:'5px'
        }}>Submit Post</button>
        </form>
        
    </div>
  )
}

export default Createpost