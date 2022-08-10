const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema(
    {
        name: { type: String},
        listIDs: [{type : Schema.Types.ObjectId, ref: 'list'}]
    }
)

module.exports = mongoose.model('board', boardSchema)