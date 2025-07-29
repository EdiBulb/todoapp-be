const mongoose = require('mongoose'); // 몽구스 들고오고
const Schema = mongoose.Schema; // 몽구스의 스키마 가져오기
//스키마란? 단순히 각각의 이 컬럼이 뭔지, 그리고 제약사항이 뭔지 설명한 것임

// 토큰 관련
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

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

// 유저 패스워드 호출 방지 - toJSON 함수 사용 mongoose에서 제공함 - 오브젝트를 FE로 보낼때는 JSON 데이터타입을 사용한다. 이게 오브젝트가 JSON로 바뀔 떄 호출할 수 있는 함수임
userSchema.methods.toJSON = function(){
    const obj=this._doc // 객체 생성
    delete obj.password // 비밀번호 제거
    return obj 
}

// 토큰 생성
userSchema.methods.generateToken = function(){
    const token = jwt.sign({ _id: this._id}, JWT_SECRET_KEY, {expiresIn:'1d'});
    return token;

}


// 실제 모델 생성 - 모델의 이름 User  
const User = mongoose.model("User", userSchema)
module.exports = User;