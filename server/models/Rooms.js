const mongoose = require("mongoose")

const RoomSchema = new mongoose.Schema({
    roomId: {type: String},
    time: {type: Date}
})

module.exports = mongoose.model("Rooms", RoomSchema)
// export default Rooms