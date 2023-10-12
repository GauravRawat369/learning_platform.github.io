import React from "react";
import { useState } from "react";
import Header from './Header';

const Courses= (props) =>{
    const { authenticated, setAuthenticated } = props;
    return(
        <div>
        <Header authenticated={authenticated} setAuthenticated={setAuthenticated}/>
            This is Courses page
        </div>
    );
}

export default Courses 