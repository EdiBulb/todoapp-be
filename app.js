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