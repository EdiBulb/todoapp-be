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

userController.loginWithEmail= async (req, res)=>{
    try{
        const{email, password} = req.body
        const user = await User.findOne({email}, "-createdAt -updatedAt -__v")

        if(user){
            // password=> 유저가 입력한 값 자체
            // user.password => 암호화 되어있음
            const isMatch = bcryptjs.compareSync(password, user.password); // 비교
            if(isMatch){
                //토큰 발행
                // npm json web token 토근 발행
                const token = user.generateToken()
                return res.status(200).json({status: "success", user, token}) // 성공 시, 유저 정보랑 토큰 보내줌

            }
        }
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.")
    }catch(error){
        res.status(400).json({status: "fail", message: error.message})
    }
}
module.exports = userController