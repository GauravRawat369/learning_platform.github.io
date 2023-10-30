import React, { useState } from "react";
import  Peer  from "peerjs";
import { useEffect, useRef } from "react";
const LiveStream = () => {
  const remoteUserRef = useRef(null);
  const otherUserRef = useRef(null);
  const [peerid,setPeerid] = useState("");
  const [otherpeerid,setOtherpeerid] = useState("");
  const peerInstance = useRef(null);
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

  return (
    <div className="other-content-input-div">
            <input className= "input"type="text" onChange={e => setOtherpeerid(e.target.value)}/>
            <button onClick={Call}>Call</button>
            <video ref={otherUserRef} autoPlay/>
            <video ref={remoteUserRef} autoPlay />
    </div>
  );
};

export default LiveStream;

