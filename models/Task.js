const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 스키마 정의
const taskSchema = Schema({
    task:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean,
        required:true
    }
}, {timestamps: true}) // 몇시에 만들었는지 도장 찍어줌

// 모델 만들기 
const Task = mongoose.model("Task", taskSchema);

// 수출하기
module.exports = Task;