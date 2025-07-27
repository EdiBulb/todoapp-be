const Task = require("../models/Task");


const taskController = {} // 객체

// req는 FE에서 온 데이터, res는 응답할 데이터  

// CREATE
// task를 만들려면 어떤 정보가 필요해? - task, isComplete
taskController.createTask= async (req, res)=>{
    try{
        //req의 body에 그 정보가 들어있다. 그래서 body parser를 다운받았음
        const {task, isComplete} = req.body;
        //새로운 task를 만들고, task랑 isComplete를 넣어준다.
        const newTask = new Task({task, isComplete})
        // 저장해줘
        await newTask .save()
        //답장 보내기 - res에는 status 형태로 보낼 수도 있다.
        res.status(200).json({status:'ok', data:newTask})
    }catch(err){
        res.status(400).json({status:'fail', error:err})
    }
    // request는 항상 header와 body로 구성되어있다. 그래서 body parser를 쓴다.
}

// GET
taskController.getTask = async(req, res)=>{
    try{
        const taskList = await Task.find({}).select("-__v")
        res.status(200).json({status:"ok", data:taskList})
    }catch(err){
        res.status(400).json({ status: "fail", error:err})
    }
}

// Update
taskController.updateTask = async(req, res)=>{
    try{
        // 1. Get id from URL
        const id = req.params.id
        // 2. Take off data to update
        const {task, isComplete} = req.body
        // 3. DB에서 해당 id를 찾아서 업데이트
        const updatedTask = await Task.findByIdAndUpdate(id, {task, isComplete}, {new:true, runValidators:true})

        // 4. send response
        res.status(200).json({status:"ok", data: updatedTask})
    }catch{
        res.status(400).json({status:"fail", error:err})
    }
    
}

// Delete
taskController.deleteTask = async(req, res)=>{
    try{
        const id = req.params.id

        const deletedTask = await Task.findByIdAndDelete(id)
        res.status(200).json({status: "ok", data:deletedTask})
    }catch(err){
        res.status(400).json({status: "fail", error:err})

    }
    
}

module.exports = taskController