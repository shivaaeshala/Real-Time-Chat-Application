import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import ChatBox from "./ChatBox";
import axios from "axios"
import Header from "./Header";
// import {addRooms, checkRooms} from "../../../server/routes/addRooms.js"
// import User from "../../../server/models/Users"

function CreateGrp({ user }) {
  // const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [created, setCreated] = useState(false);
  const [roomname, setRoomname] = useState("");
  const [create, setCreate] = useState(0);
  //   const name = user.username

  const updateGrp = async () => {
    try {
      await axios.post("https://real-time-chat-application-v8j4.onrender.com/api/auth/add-group", { username: user.username, room: room, roomname: roomname })
    }
    catch (error) {
      alert(error.response.data.msg)
    }
  }

  const createRoom = () => {
    if (roomname !== "") {
      socket.emit("create_room");
    }
  };

  const joinRoom = async () => {

    try {
      await axios.post("http://localhost:5000/api/auth/checkRoom", { room: room })
      // setUsername(user.username)
      if (room !== "") {
        socket.emit("join_room", room);
        setJoined(true);
        if (!(room in user.groups)) {
          updateGrp()
        }
      }
    }
    catch (error) {
      alert(error.response.data.msg)
    }
  };

  const joinRoomDirectly = () => {
    // setUsername(user.username)
    if (room !== "") {
      socket.emit("join_room", room);
      setJoined(true);
      if (!(room in user.groups)) {
        updateGrp()
      }
    }
  }

  const addRoom = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/addRoom", { room: room })
      // setCreate(1)
    }
    catch (error) {
      alert(error.response.data.msg)
    }
  }

  useEffect(() => {
    socket.on("room_created", (roomId) => {
      setRoom(roomId);
      setCreated(true);
    });

    return () => {
      socket.off("room_created");
    };
  }, []);

  // useEffect(() => {
  //   if (room !== "") {
  //     updateGrp();
  //   }
  // }, [room])

  return (
    <>
      <Header />
      <div>
        {create === 1 ? (
          !created ? (
            <div>
              <input
                placeholder="Room name"
                onChange={(e) => setRoomname(e.target.value)}
              />
              <button onClick={() => { createRoom() }}>Create</button>
            </div>
          ) : !joined ? (
            <div>
              <p>Room ID: <strong>{room}</strong></p>
              <button onClick={() => { addRoom(); joinRoomDirectly() }}>Join Room</button>
            </div>
          ) : (
            <ChatBox socket={socket} username={user.username} room={room} />
          )
        ) : !joined ? (
          <div className="flex flex-col gap-10 justify-center items-center content-center">
            <div>
              <input
                placeholder="Room ID"
                onChange={(e) => setRoom(e.target.value)}
              />
              <button onClick={joinRoom}>Join</button>
            </div>
            <p>or</p>
            <button onClick={() => setCreate(1)}>Create a Room</button>
          </div>
        ) : (
          <ChatBox socket={socket} username={user.username} room={room} />
        )}
      </div>
    </>
  );
}

export default CreateGrp;