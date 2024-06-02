const mongoose = require('mongoose')
const bcrypt = require ('bcrypt')

const login_schema = new mongoose.Schema({
    Username :{
        type:String,
        unique:true,
        required:true
    },
    Password :{
        type:String,
        required:true
    }
})

login_schema.pre('save', async function (next){
     if (this.isModified("Password")){
        this.Password = await bcrypt.hash(this.Password,10)
     }
     next()
    }
)

const login = mongoose.model("credential",login_schema)

module.exports = {login}