const express = require('express')
const router = express.Router()
const ListController = require('../app/controllers/ListController')


//list controller
router.get('/', ListController.getLists)
router.get('/:id', ListController.getList)
router.put('/', ListController.updateTaskInList)
router.delete('/:id', ListController.deleteList)
module.exports = router