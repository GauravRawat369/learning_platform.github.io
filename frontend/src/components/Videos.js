import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import "./create.css";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const Videos = (props) => {
  const { authenticated, setAuthenticated,username } = props;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [ourid, setOurid] = useState(() => {
    const storedId = localStorage.getItem("ourid");
    return storedId ? JSON.parse(storedId) : [];
  });


  useEffect(() => {
    socket.on("message", (message) => {
      setOurid((prevIds) => [...prevIds, socket.id]);
      localStorage.setItem("ourid", JSON.stringify([...ourid,socket.id]));
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off();
    };
  }, [messages, ourid]);

  useEffect(() => {
    // Fetch chat messages from the server when the component mounts
    fetch("http://localhost:5000/api/messages")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setMessages(data); // Set the retrieved messages in the state
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

  const textSubmit = () => {
    if (messageInput.trim() !== "") {
      // Send message and username to the server
      socket.emit("message", {
        username: username, // Replace with the actual username variable
        message: messageInput,
      });
      setMessageInput("");
    }
  };

  //   ourid.length?console.log("This is our id",ourid):console.log("")
  return (
    <div>
      <Header
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      <div className="video-content-div">
        <div className="other-content-div"></div>
        <div className="chat-div">
          <ScrollToBottom className="user-chat-text chat-messages">
            {console.log(messages)}
            {messages.map((message, index) => {
            const isOutgoingMessage = ourid.includes(message.socketid);
            const messageClass = isOutgoingMessage ? "outcomming-chats" : "incomming-chats";

            return (
                <div key={index} className={`${messageClass} message`}>
                  {message.username} {"   "}:{"  "}
                {message.message}
                </div>
            );
            })}

          </ScrollToBottom>
          <div className="chat-input-text">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={textSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;