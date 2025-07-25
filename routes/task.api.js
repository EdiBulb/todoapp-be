// All of api related to task is here.
const express = require('express')
const taskController = require('../controller/task.controller')
const router = express.Router()

// add task
router.post('/', taskController.createTask)

// get list
router.get('/',taskController.getTask)

// update
router.put('/:id', taskController.updateTask)

// delete
router.delete('/:id', taskController.deleteTask)


module.exports = router
