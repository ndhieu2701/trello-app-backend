const list = require('../models/List')
const task = require('../models/Task')
const board = require('../models/Board')

class List {
    //[GET]/api/list
    async getLists(req, res, next){
        const listIDs = await list.find({})
        res.json(listIDs)
    }

    //[GET]/api/list/:id
    async getList(req, res, next) {
        let a = []
        const listID = await list.findOne({_id: req.params.id})
        const tasks = await task.find({_id: listID.taskIds})
        for (let taskId of listID.taskIds){
            for (let task of tasks){
                if(taskId == task._id.toString())
                    a.push(task)
            }
        }
        res.json(a)
    }

    //[PUT]/api/list
    async updateTaskInList (req, res, next) {
        const fromList = await list.findOne({ _id: req.body.fromListId})
        let newList
        let toIndex
        let update
        const listIdFromList = fromList.taskIds
        let indexStart = listIdFromList.indexOf(req.body.taskChangeId)

        //move task in 1 list
        if(req.body.toListId == req.body.fromListId){
            let indexDrop = listIdFromList.indexOf(req.body.toTaskNextSiblingId)
            if(indexDrop === -1) toIndex = listIdFromList.length

            else if(indexDrop > indexStart) {
                toIndex = indexDrop - 1
            }
            else if(indexDrop < indexStart) {
                toIndex = indexDrop 
            }

            newList = arraymove(listIdFromList, listIdFromList.indexOf(req.body.taskChangeId), toIndex)
            update = await list.updateOne({_id: req.body.fromListId} , {$set: {taskIds: newList}})
        }
        //move task between 2 list
        else {
            listIdFromList.splice(indexStart, 1)
            await list.updateOne({_id: req.body.fromListId}, {$set: {taskIds: listIdFromList}})
            const toListId = await list.findOne({ _id:req.body.toListId })
            const listDropId = toListId.taskIds
            
            let indexDrop = listDropId.indexOf(req.body.toTaskNextSiblingId)

            if(indexDrop === -1) {
                toIndex = listDropId.length
            }
            else toIndex = indexDrop
            listDropId.splice(toIndex, 0, req.body.taskChangeId)
            update = await list.updateOne({_id: req.body.toListId }, {$set: {taskIds : listDropId}})

        }
        res.json(update)
    }

    //[DELETE]/api/list/:id
    async deleteList(req, res, next) {
        const boardId = await board.find({})
        const listDelete = await board.updateOne({_id: boardId[0]._id}, {$pull: {listIDs: req.params.id}})
        const response = await list.deleteOne({_id: req.params.id})
        res.json(response)
    }
}

function arraymove(arr, fromIndex, toIndex) {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr
}

module.exports = new List();