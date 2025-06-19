import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { socket } from "../socket"
import Header from "./Header"
import Loader from "../loader/Loader"

function GroupList({ user, setCurrentRoom, loading }) {
  const navigate = useNavigate()

  const handleJoin = (roomId) => {
    setCurrentRoom(roomId)
    socket.emit("join_room", roomId)
    navigate("/chat")
  }

  if (!user) return <p>Loading user...</p>;

  return (
    <>
      {loading ? <Loader /> :
      <>
      <Header />
      <div className="groups flex flex-col justify-start max-w-2xl gap-20">
        <div className="flex flex-row  justify-between">
          <h2 className="text-xl">Welcome, <b>{user.username}</b></h2>
          <div>
            <Link to="/create">
              <h4>Create group</h4>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-10">
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
        </div>
      </div>
      </>
      }
    </>
  )
}

export default GroupList
