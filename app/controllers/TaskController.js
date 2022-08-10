const list = require('../models/List')
const task = require('../models/Task')


class Task {
    //[GET]/api/task
    async getTask (req, res, next) {
        const data = await task.find({})
        res.json(data)
    }

    //[POST]/api/task
    async postTask (req, res, next) {
        const newTask = await task.create({name: req.body.name})
        const listAddTask = await list.updateOne({_id: req.body.id}, {$push: {taskIds: newTask._id.toString()}})
        res.json(newTask)
    }

    //[DELETE]/api/task/:id
    async deleteTask (req, res, next) {
        const listContainTask = await list.findOne().where({taskIds: req.params.id})
        const listContainTaskUpdate = await list.updateOne({_id: listContainTask._id}, {$pull: {taskIds: req.params.id}})
        const taskDelete = await task.deleteOne({_id: req.params.id})
        res.json(taskDelete)
    }
}

module.exports = new Task()
