const express = require('express')
const router = express.Router()
const BoardController = require('../app/controllers/BoardController')

router.get('/', BoardController.getBoard)
router.get('/:id', BoardController.getListInBoard)
router.post('/:id', BoardController.postListInBoard)
router.put('/', BoardController.updateListInBoard)
module.exports = router