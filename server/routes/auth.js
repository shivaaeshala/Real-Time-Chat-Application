const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/Users")
const Rooms = require("../models/Rooms")
const dotenv = require("dotenv")
const authMiddelware = require("../middleware/authMiddleware")
const router = express.Router()

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

router.post("/register", async(request, response) => {
    const {username, password} = request.body;
    try{
        const existing = await User.findOne({username})
        if (existing) return response.status(400).json({msg: "User already exists"})

        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = new User({username, password : hashedPass, groups: []})
        await newUser.save();
        await newUser.save()

        response.status(201).json({msg: "User registered successfully"})
    }
    catch(error){
        response.status(500).json({msg: error.message})
    }
})

router.post("/login", async(request, response) => {
    const {username, password} = request.body

    try{
        const user = await User.findOne({username})
        if(!user) return response.status(400).json({msg: "User doesnot exist"})

        const isCorrect = await bcrypt.compare(password, user.password)
        if (!isCorrect) return response.status(400).json({msg: "Invalid credentials"})

        const token = jwt.sign({id: user._id}, JWT_SECRET)
        response.json({token, user})
    }
    catch(error){
        response.status(500).json({msg: error.message})
    }
})

router.post("/add-group", async(request, response) => {
    const {username, room, roomname} = request.body
    try{
        const user = await User.findOne({username})
        user.groups.set(room, roomname)
        await user.save()
        response.status(400).json({msg:"Group added"})
    }
    catch(error){
        response.status(500).json({msg: "Failed"})
    }
})

router.get("/me", authMiddelware, (request, response) => {
    response.json({user: request.user})
})

router.post("/checkRoom", async(request, response) => {
    const {room} = request.body
    try{
        const isRoom = await Rooms.findOne({roomId: room})
        if(isRoom) return response.status(201).json({msg:"Room found"})
        return response.status(400).json({msg: "No room found"})

    }
    catch(error){
        response.status(500).json({msg: error.message})
    }
})


router.post("/addRoom", async(request, response) => {
    const {room} = request.body

    try{
        const isPresent = await Rooms.findOne({roomId: room})
        if (isPresent) return response.status(201).json({msg: "Room already exists"})
            
        const newRoom = new Rooms({roomId: room, time: new Date()})
        await newRoom.save()
        return response.status(201).json({msg: "Room created and added to db"})
    }
    catch(error){
        response.status(500).json({msg: error.message})
    }
})


module.exports = router