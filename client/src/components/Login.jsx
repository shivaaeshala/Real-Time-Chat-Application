import React, {useState} from "react"
import axios from "axios"

function Login({setUser, navigate}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {
        try{
            const res = await axios.post("http://localhost:5000/api/auth/login", {username, password})
            localStorage.setItem("token", res.data.token)
            setUser(res.data.user)
            // alert(res.data.username)
            navigate("/groups")
        }
        catch(error){
            alert(error.response.data.msg)
        }
    }

    return(
        <div>
            <h2>Login</h2>
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login