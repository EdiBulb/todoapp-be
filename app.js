require('dotenv').config(); // 세미콜론 꼭 필요!
const express = require('express')
const mongoose = require('mongoose')
const cors =require('cors')
const bodyParser = require('body-parser')
const indexRouter = require("./routes/index")

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD
console.log("mongoouri:", MONGODB_URI_PROD)

const app = express()

app.use(bodyParser.json()) // app uses bodyParser.
app.use(cors())
app.use("/api", indexRouter) // app uses indexRouter. // /api라는 주소로 오면 indexRouter로 간다. 

const mongoURI = MONGODB_URI_PROD

mongoose.connect(mongoURI, {useNewUrlParser:true})
    .then(()=>{console.log("mongoose connected")}) 
    .catch((err)=>{console.log("DB connection fail", err)}) // error인 경우 잡는다.

const PORT = process.env.PORT || 5000;

// 포트넘버 5000을 주시한다 - 로컬호스트 5000으로 오는 어떤 request는 다 이곳으로 온다. 
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// 1. 회원가입 로직
// 유저가 이메일, 패스워드, 유저이름 입력해서 보낸다.
// 받은 정보를 저장한다.(데이터베이스 모델이 필요하다) but 패스워드를 그대로 DB에 저장해도 되는가? -> 암호화
// 패스워드 암호화시켜서 저장 - 

// 1. 라우터 - 프론트엔드가 요청을 보낼 주소를 설정한다.
// 2. 모델 만들기 - 데이터를 저장하려면 데이터를 저장할 엑셀파일 폼이 있어야한다. 
// 3. 데이터 저장(이미 가입된 유저 유무 파악, 패스워드는 암호화하기) 
// 4. 응답 보낸다.
