const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const addRooms = require("./routes/addRooms")

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(() => {console.log("Database connected")}).catch((err) => console.log(err))

app.use("/api/auth", addRooms)


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))