const express = require("express")
const Rooms = require("../models/Rooms")
const dotenv = require("dotenv")
const axios = require("axios")
const router = express.Router()

dotenv.config()

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
        const newRoom = new Rooms({roomId: room, time: new Date()})
        await newRoom.save()
        return response.status(201).json({msg: "Room created and added to db"})
    }
    catch(error){
        response.status(500).json({msg: error.message})
    }
})

module.exports = router