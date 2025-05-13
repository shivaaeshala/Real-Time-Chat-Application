import React, { useState } from "react"
import axios from "axios"
import Loader from "../loader/Loader"
import "../App.css"

function Register({ navigate, loading }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const register = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/register", { username, password })
            alert("Registered successfully. Please login")
            navigate("/login")
        }
        catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div>
            {loading ? <Loader className="loader" /> :
                <div className="flex flex-col gap-20">
                    <h2 className="font-bold text-5xl">Register</h2>
                    <div className="flex flex-col items-center gap-15">
                        <input className="p-3 border-2 rounded-lg" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input className="p-3 border-2 rounded-lg" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                        <button className="w-1/4" onClick={register}>
                            Register
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Register