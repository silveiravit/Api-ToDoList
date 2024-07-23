const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    taskName: String,
    date: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Tasks", TaskSchema)