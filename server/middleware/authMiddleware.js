const jwt = require("jsonwebtoken")
const User = require("../models/Users")
const dotenv = require("dotenv")

dotenv.config()

const authMiddelware = async (request, response, next) => {
    const token = request.header("Authorization")?.split(" ")[1]

    if (!token) return response.status(401).json({msg: "No token available"})

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decode.id).select("-password")
        if (!user) return response.status(404).json({msg: "User Not Found"})

        request.user = user
        next()
    }
    catch(error){
        response.status(401).json({msg: "Invalid token"})
    }
}

module.exports = authMiddelware