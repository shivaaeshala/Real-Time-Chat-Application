import { useNavigate } from "react-router-dom"
import "../App.css"

function Header() {
    
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return(
        <div className="header flex flex-row justify-between content-center items-center shadow-lg">
            <h2 className="font-bold text-2xl">Small Talk</h2>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Header