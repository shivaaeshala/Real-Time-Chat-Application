import React, {useState} from "react"
import axios from "axios"

function Register({navigate}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const register = async() => {
        try{
            await axios.post("http://localhost:5000/api/auth/register", {username, password})
            alert("Registered successfully. Please login")
            navigate("/login")
        }
        catch(error){
            alert(error.response.data.msg)
        }
    }

    return(
        <div>
            <h2>Register</h2>
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={register}>
                Register
            </button>
        </div>
    )
}

export default Register