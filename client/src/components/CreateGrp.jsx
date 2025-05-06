import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import ChatBox from "./ChatBox";
import axios from "axios"
// import User from "../../../server/models/Users"

function CreateGrp({user}) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [created, setCreated] = useState(false);
  const [roomname, setRoomname] = useState("");
  const [create, setCreate] = useState(0);
//   const name = user.username

  const updateGrp = async () => {
    try{
        await axios.post("http://localhost:5000/api/auth/add-group", {username: user.username, room: room, roomname: roomname})
    }
    catch(error){
        alert(error.response.data.msg)
    }
  }

  const createRoom = () => {
    if (roomname !== "") {
      socket.emit("create_room");
    }
  };

  const joinRoom = () => {
    setUsername(user.username)
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setJoined(true);
      if (!(room in user.groups)) {
        updateGrp()
      }
    }
  };

  useEffect(() => {
    socket.on("room_created", (roomId) => {
      setRoom(roomId);
      setCreated(true);
    });

    return () => {
      socket.off("room_created");
    };
  }, []);

  useEffect(() => {
    if(room !== ""){
        updateGrp();
    }
  }, [room])

  return (
    <div>
      {create === 1 ? (
        !created ? (
          <div>
            <input
              placeholder="Room name"
              onChange={(e) => setRoomname(e.target.value)}
            />
            {/* <h2>Or</h2> */}
            <button onClick={() => {createRoom()}}>Create</button>
          </div>
        ) : !joined ? (
          <div>
            <p>Room ID: <strong>{room}</strong></p>
            {/* <input
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            /> */}
            <button onClick={joinRoom}>Join Room</button>
          </div>
        ) : (
          <ChatBox socket={socket} username={username} room={room} />
        )
      ) : !joined ? (
        <div>
          {/* <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          /> */}
          <input
            placeholder="Room ID"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join</button>
          <p>or</p>
          <button onClick={() => setCreate(1)}>Create a Room</button>
        </div>
      ) : (
        <ChatBox socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default CreateGrp;