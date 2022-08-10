const express = require('express')
const router = express.Router()
const TaskController = require('../app/controllers/TaskController')


router.get('/', TaskController.getTask)
router.post('/', TaskController.postTask)
router.delete('/:id', TaskController.deleteTask)
module.exports = router