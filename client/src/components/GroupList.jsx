import React from "react"
import { useNavigate, Link } from "react-router-dom"
import {socket} from "../socket"

function GroupList({ user, setCurrentRoom }) {
  const navigate = useNavigate()

  const handleJoin = (roomId) => {
    setCurrentRoom(roomId)
    socket.emit("join_room", roomId)
    navigate("/chat")
  }

  if (!user) return <p>Loading user...</p>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <h3>Your Groups:</h3>
      <ul>
        {Object.entries(user.groups).map(([roomId, roomName]) => (
          <li key={roomId}>
            <button onClick={() => handleJoin(roomId)}>
              Join {roomName} ({roomId})
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Join a group</h3>
        <Link to="/create">
          <h4>Create group</h4>
        </Link>
      </div>
    </div>
  )
}

export default GroupList
