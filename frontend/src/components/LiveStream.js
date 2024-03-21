import React, { useState } from "react";
import  Peer  from "peerjs";
import { useEffect, useRef } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});
const LiveStream = () => {
  const remoteUserRef = useRef(null);
  const otherUserRef = useRef(null);
  const [peerid,setPeerid] = useState("");
  const [otherpeerid,setOtherpeerid] = useState("");
  const peerInstance = useRef(null);
  const [bigvideoclass,setBigvideoclass] = useState("Bigger-video-div");
  const [smallvideoclass,setSmallvideoclass] = useState("Smaller-video-div");
  useEffect(() => {
    socket.on("video", (peerid) => {
      setOtherpeerid(peerid);
    });

    return () => {
      socket.off();
    };
    },[peerid]);
  console.log("other peer is : ",otherpeerid);
  useEffect(() => {
    var peer = new Peer();

    peer.on("open", (id) => {
        setPeerid(id);
    });
    peer.on("call", (call) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({ video: true },(stream) => {
            otherUserRef.current.srcObject = stream;
            otherUserRef.current.play();
            call.answer(stream);    
            call.on("stream", (remoteStream) => {
              // Show stream in some video/canvas element.
              remoteUserRef.current.srcObject = remoteStream;
              remoteUserRef.current.play();
            });
          },
        );
    });
    peerInstance.current = peer;
  }, []);
  console.log("my peer is : ",peerid);
  socket.emit("video", {
    peerid : peerid
  });
  const Call = () => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: true},(stream) => {
        otherUserRef.current.srcObject = stream;
        otherUserRef.current.play();
        var call = peerInstance.current.call(otherpeerid, stream);
        call.on("stream", (remoteStream) => {
          // Show stream in some video/canvas element.
          remoteUserRef.current.srcObject = remoteStream;
          remoteUserRef.current.play();
        });
      },
    );
  };
  const changeClassname = () =>{
    setBigvideoclass(smallvideoclass)
    setSmallvideoclass(bigvideoclass)

  }
  return (
    <div className="other-content-input-div">
            <div className="inputandbutton-div" >
              <input className= "input" type="text" value={otherpeerid} />
                  <button onClick={Call}>Call</button>
            </div>
            <div className={bigvideoclass} >
            <video className="video-config" ref={otherUserRef} autoPlay/>
            </div>
            <div className={smallvideoclass} onClick={changeClassname}>
              <video className="video-config" ref={remoteUserRef} autoPlay/>
            </div>
          
    </div>
  );
};

export default LiveStream;

