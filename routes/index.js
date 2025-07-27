const express = require('express')
const router = express.Router()
const taskApi = require('./task.api')

const userApi = require('./user.api')

router.use('/tasks', taskApi) // / if tasks used, call taskApi
router.use("/user", userApi) // 어떤 주소를 부르면 userApi를 사용할까? - /user


module.exports = router
