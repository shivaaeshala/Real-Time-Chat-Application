import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
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
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

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
        console.error("Invalid token, logging out", error)
        localStorage.removeItem("token")
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // simulate loading delay
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<HomePage navigate={navigate} />} />
      <Route path="/register" element={<Register navigate={navigate} loading={loading} />} />
      <Route path="/login" element={<Login setUser={setUser} navigate={navigate} loading={loading}/>} />
      <Route path="/groups" element={<GroupList user={user} setCurrentRoom={setCurrentRoom} loading={loading} />} />
      <Route path="/chat" element={<ChatBox socket={socket} username={user?.username} room={currentRoom} loading={loading} />} />
      <Route path="/create" element = {<CreateGrp user={user} loading={loading} />} />
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
