// user.api.js를 생성
const express = require("express") // express 사용
const router = express.Router(); // router사용
const userController = require('../controller/user.controller')

// 1. 회원가입 endpoint 만들기 // 회원가입은 post를 써야한다.
router.post("/", userController.createUser); // /api/user post => create user



// 로그인 라우터: email과 password를 읽어와야해서 post를 사용(get이 아니라)
router.post("/login", userController.loginWithEmail) // /api/user/login post => login user

module.exports = router;    

//npm start하고 postman에서 실험한다.