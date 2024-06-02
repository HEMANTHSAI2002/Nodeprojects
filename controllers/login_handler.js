const {login} = require('../models/user_login_schema')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const bcrypt = require('bcrypt')

async function handlerPostLoginUser(req,res){
    const body = req.body
    const result = await login.create({
        Username:body.Username,
        Password:body.Password
    })
    return res.status(200).json({"msg":"Created"})
}

async function handlerBearerTokenGen(req,res){
    const body = req.body
    const unique_user = await login.findOne({
        Username :body.Username
    })
    if(!unique_user){
        res.status(400).json({"msg":"Username is invalid"})
    }
    const result = await bcrypt.compare(body.Password,unique_user.Password)
    const token = await jwt.sign(unique_user.Password,process.env.Bearertoken_secret)
    console.log(result)
    res.status(200).json({"msg":token})
}

module.exports={
    handlerPostLoginUser,
    handlerBearerTokenGen
}