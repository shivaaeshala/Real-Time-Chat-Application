import React, { useState } from "react"
import axios from "axios"
import Loader from "../loader/Loader"
import "../App.css"

function Login({ setUser, navigate, loading }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {
        try {
            const res = await axios.post("https://invigorating-renewal-production.up.railway.app/api/auth/login", { username, password })
            localStorage.setItem("token", res.data.token)
            setUser(res.data.user)
            // alert(res.data.username)
            navigate("/groups")
        }
        catch (error) {
            alert(error.response.data.msg)
        }
    }


    return (
        <div>
            {loading ? <Loader className="loader" />
                :
                <div className="flex flex-col gap-20">
                    <h2 className="font-bold text-5xl">Login</h2>
                    <div className="flex flex-col items-center gap-15">
                        <input className="p-3 border-2 rounded-lg" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input className="p-3 border-2 rounded-lg" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <button className="w-1/4" onClick={login} >Login</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login