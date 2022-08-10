const board = require('../models/Board')
const list = require('../models/List')

class Board {
    //[GET]/api/board
    async getBoard(req, res, next) {
        const response = await board.find({})
        res.json(response)
    }

    //[GET]/api/board/:id
    async getListInBoard(req, res, next) {
        let a = []
        const boardID = await board.findOne({_id: req.params.id})
        const lists = await list.find({_id: boardID.listIDs})
        for (let listId of boardID.listIDs){
            for (let list of lists){
                if(listId == list._id.toString())
                    a.push(list)
            }
        }
        res.json(a)
    }

    //[POST]/api/board/:id
    async postListInBoard(req, res, next){
        const newList = await list.create(req.body)
        const boardAddList = await board.updateOne({_id: req.params.id}, {$push: {listIDs: newList._id.toString()}})
        res.json(newList)
    }

    //[PUT]/api/board
    async updateListInBoard(req, res, next){

        const boardUpdate = await board.find({})
        const listIDs = boardUpdate[0].listIDs
        const fromIndex = listIDs.indexOf(req.body.listChange)

        let toIndex = listIDs.indexOf(req.body.toListChange)
        if(req.body.toListChange === 'null') toIndex = listIDs.length 
        else if (fromIndex < toIndex) toIndex = toIndex - 1

        const newListIDs = arraymove(listIDs, fromIndex, toIndex )

        const response = await board.updateOne({_id: boardUpdate[0]._id}, {$set: {listIDs: newListIDs}})
        res.json()
    }
}

function arraymove(arr, fromIndex, toIndex) {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr
}

module.exports = new Board()