require('dotenv').config(); // 세미콜론 꼭 필요!

// 기본 세팅
const express = require('express')
const mongoose = require('mongoose')

// cors 에러 방지
const cors =require('cors');


const bodyParser = require('body-parser')
// cors 에러 방지 위해 app에서 cors를 사용한다.

const app = express()
app.use(bodyParser.json()) // req.body를 읽어오기 쉽게 bodyParser 사용
// 라우터 연결
app.use(cors());

const indexRouter = require("./routes/index")
app.use("/api", indexRouter) // /api로 시작하는 url 요청은 indexRouter가 처리한다. // 일부로 "api"를 붙여줘서 FE에서 보내는 요청이라는 것을 확실히 한다.


//DB관련
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD
// console.log("mongoouri:", MONGODB_URI_PROD)

// 데이터베이스 주소
const mongoURI = MONGODB_URI_PROD
// 몽구스 연결
mongoose.connect(mongoURI, {useNewUrlParser:true})
    .then(()=>{console.log("mongoose connected")}) 
    .catch((err)=>{console.log("DB connection fail", err)}) // error인 경우 잡는다.

const PORT = process.env.PORT || 5000;

// 포트넘버 5000을 주시한다 - 로컬호스트 5000으로 오는 어떤 request는 다 이곳으로 온다. 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 1. 회원가입 로직
// 유저가 이메일, 패스워드, 유저이름 입력해서 보낸다.
// 받은 정보를 저장한다.(데이터베이스 모델이 필요하다) but 패스워드를 그대로 DB에 저장해도 되는가? -> 암호화
// 패스워드 암호화시켜서 저장 - 

// 1. 라우터 - 프론트엔드가 요청을 보낼 주소를 설정한다.
// 2. 모델 만들기 - 데이터를 저장하려면 데이터를 저장할 엑셀파일 폼이 있어야한다. 
// 3. 데이터 저장(이미 가입된 유저 유무 파악, 패스워드는 암호화하기) 
// 4. 응답 보낸다.

// 2. 로그인 로직
// 이메일 패스워드를 입력해서 보냄
// DB에 해당 이메일과 패스워드 가진 유저가 있는지 확인
// 없다면 로그인 실패
// 있다면 유저 정보 + 토큰 보내주기
// 프론트엔드에서는 이 정보를 저장

// 1) 라우터 설정
// 2) 이메일 패스워드 정보 읽어오기
// 3)이메일을 가지고 유저정보 가져오기
// 4) 이 유저에 디비에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
// 5) 맞다- 토근 발행
// 6) 틀리면 에러 메세지 보냄
// 7) 응답으로 유저 정보 + 토큰 보냄