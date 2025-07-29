// All of api related to task is here.
const express = require('express')
const taskController = require('../controller/task.controller')
const router = express.Router()

// add task
// router.post('/', taskController.createTask)
// 테스트용으로 다시 만듬
router.post("/", (req, res)=>{
    res.send("create task")
})

// get list
// router.get('/',taskController.getTask)
// 테스트용으로 다시 만듬
router.get("/", (req, res)=>{
    res.send("get tasks")
})
// update
router.put('/:id', taskController.updateTask)

// delete
router.delete('/:id', taskController.deleteTask)


module.exports = router
