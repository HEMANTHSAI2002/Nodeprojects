const mongoose = require('mongoose')

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

module.exports = {User}