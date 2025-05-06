import React, { useState, useEffect } from "react";

function ChatBox({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    const messageData = {
      room,
      author: username,
      message,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("send_message", messageData);
    // setChat((prev) => [...prev, messageData]);
    setMessage("");
    socket.emit("stop_typing", room);
    // console.log(chat);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));

    return () => {
      socket.off("receive_message");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [socket]);

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit("typing", room);

    setTimeout(() => {
      socket.emit("stop_typing", room);
    }, 2000);
  };

  return (
    <div>
      <div className="chat">
        {chat.map((msg, i) => (
          <div key={i}>
            <b>{msg.author}</b>: {msg.message} <small>{msg.time}</small>
          </div>
        ))}
      </div>
      {isTyping && <p>Someone is typing...</p>}
      <input
        value={message}
        onChange={handleTyping}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatBox;
