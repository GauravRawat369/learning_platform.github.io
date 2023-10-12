import React from "react";
import { useState } from "react";
import Header from './Header';
const Videos=(props) =>{
    const { authenticated, setAuthenticated } = props;
    return(
        <div>
        <Header authenticated={authenticated} setAuthenticated={setAuthenticated}/>
            This is videos page
        </div>
    );
}

export default Videos 