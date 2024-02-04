const fs = require("fs")
const express = require("express")
let users = require('./User_Data.json')
const mongoose = require('mongoose')
const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/Node_DB").then(()=> console.log("Connected")).catch((e)=>console.log(e))
const schema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    ip_address:{
        type:String,
        required:true
    }

})

const User = new mongoose.model("user",schema)

app.use(express.urlencoded({extended:false}))

app.get('/app/list',async(req,res)=>{
    const all_users = await User.find({})
    return res.json(all_users)
})

app.get('/html/list',async(req,res)=>{
    const all_users = await User.find({})
    const html = `
    <ul>
    ${all_users.map((user)=>`<li>${user.first_name} ID:${user._id}</li>`).join(" ")}
    </ul>
    `
    return res.send(html)
})

app.get('/app/list/:id',async(req,res)=>{
    const req_user = await User.findById(req.params.id)
    if(!req_user){
        res.json({"message" : "Please send a valid input"})
    }
    else{
    res.json(req_user)
    }
})

app.post('/app/add',async(req,res)=>{
    const body = req.body
    if(!body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.ip_address
        ){
            res.status(400).json({msg:"All fields are required"})
        }
    const result= await User.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        gender:req.body.gender,
        ip_address:req.body.ip_address
    })
    console.log(result)
    return res.status(201).json({msg:"Created"})
})

app.delete('/app/delete/:id',async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Selected User Deleted"})
})

app.patch('/app/patch/:id',async(req,res)=>{
    const body = req.body
    await User.findByIdAndUpdate(req.params.id,{
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        gender:req.body.gender,
        ip_address:req.body.ip_address
    })
    res.status(201).json({msg:"Updated the Required User"})
})
app.listen(5000,()=>{
    console.log("Server Running !")
})