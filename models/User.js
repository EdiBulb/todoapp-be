const mongoose = require('mongoose'); // 몽구스 들고오고
const Schema = mongoose.Schema; // 몽구스의 스키마 가져오기

const userSchema = Schema({
    name:{
        type:String,
        required:true // 필수 값
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}, {timestamps:true})
//스키마란? 단순히 각각의 이 컬럼이 뭔지, 그리고 제약사항이 뭔지 설명한 것임
// 실제 모델 생성 - 모델의 이름 User  
const User = mongoose.model("User", userSchema)
module.exports = User;