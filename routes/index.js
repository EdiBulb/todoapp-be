const express = require('express')
const router = express.Router()

const taskApi = require('./task.api')
const userApi = require('./user.api')

router.use('/tasks', taskApi) // /api/tasks
router.use("/user", userApi) // /api/user


module.exports = router
