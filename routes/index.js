const express = require('express')
const router = express.Router()

const taskApi = require('./task.api')
const userApi = require('./user.api')

// /tasks라는 주소로 url 주소 호출이 오면, taskApi로 간다. 
router.use('/tasks', taskApi) 

// /user라는 주소로 url 주소 호출이 오면, userApi로 간다. 
router.use("/user", userApi) // /user post => create user


module.exports = router
