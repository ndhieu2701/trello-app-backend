const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema (
    {
        name: { type: String },
        
    }
)

module.exports = mongoose.model('task', TaskSchema)