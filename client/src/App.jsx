import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import GroupList from "./components/GroupList";
import ChatBox from "./components/ChatBox";
import CreateGrp from "./components/CreateGrp";
import { socket } from "./socket";
import axios from "axios"
import "./App.css"


function AppWrapper() {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token")
      if (!token) return

      try{
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {Authorization: `Bearer ${token}`}
        })

        setUser(res.data.user)
        navigate('/groups')

      }
      catch(error){
        console.error("Invalid token, logging out")
        localStorage.removeItem("token")
      }
    }

    fetchUser()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Register navigate={navigate} />} />
      <Route path="/login" element={<Login setUser={setUser} navigate={navigate} />} />
      <Route path="/groups" element={<GroupList user={user} setCurrentRoom={setCurrentRoom} />} />
      <Route path="/chat" element={<ChatBox socket={socket} username={user?.username} room={currentRoom} />} />
      <Route path="/create" element = {<CreateGrp user={user} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
