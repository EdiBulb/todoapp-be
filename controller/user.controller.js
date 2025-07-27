const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const userController = {}


// 유저 생성
userController.createUser = async (req, res)=>{
    try{
        // req 정보는 어디서 온다? req.body에서 온다.
        const {email, name, password} = req.body // 데이터 가져오기
        const user = await User.findOne({email}) // DB에서 이미 존재하는 email인지 확인해주세요. 
        
        // 만약 유저가 이미 있다면
        if(user){
            throw new Error('The user already exists.')
        }

        // 패스워드 암호화
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);
        console.log("hash:", hash)
        // 저장
        const newUser = new User({email, name, password:hash})
        await newUser.save()
        res.status(200).json({status:"success"})

    }catch(error){
        res.status(400).json({status: "fail", error})

    }
}
module.exports = userController