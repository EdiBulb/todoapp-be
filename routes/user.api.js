// user.api.js를 생성
const express = require("express") // express 사용
const router = express.Router(); // router사용
const userController = require('../controller/user.controller')

// 1. 회원가입 endpoint 만들기
router.post("/",userController.createUser);

module.exports = router;    

//npm start하고 postman에서 실험한다.
