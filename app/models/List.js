const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema (
    {
        name: { type : String },
        taskIds : [{ type : Schema.Types.ObjectId , ref: 'task'}]
    }
)

module.exports = mongoose.model('list', ListSchema)