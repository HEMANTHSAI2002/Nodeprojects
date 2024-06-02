const schema = require('../models/zod_param_schema')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function zoderrorgen(fields){
    required_fields = []
    fields.forEach((e)=>{
        required_fields.push({
            "path":e.path[0],
            "message":e.message
        })
    })
  return required_fields
}

async function middlewareAddUser(req,res,next){
    const req_body = req.body
    const parsing = schema.postAddSchema.safeParse(req_body)
    if(parsing.success == false){
        const fields = parsing.error.errors
        const required_fields = zoderrorgen(fields)
        return res.status(400).json({required_fields})
    }
    next()
}

async function middlewareLoginUser(req,res,next){
   const body = req.body
   const parsing = schema.postLoginSchema.safeParse(body)
   if (parsing.success == false){
    const fields = parsing.error.issues
    required_fields = zoderrorgen(fields)
    return res.status(400).json({required_fields})
   }
   next()
}

async function middlewareBearertokenVerify(req,res,next){
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]

    if (!token){
        return res.status(401).json({"msg":"Unauthorized provide a token"})
    }

    const result = jwt.verify(token,process.env.Bearertoken_secret,(err,decoded)=>{
        if(err){
            res.status(401).json({"msg":"Provided token is not valid or expired"})
        }
        if(decoded){
            next()
        }
    })
}

module.exports={
   middlewareAddUser,
   middlewareLoginUser,
   middlewareBearertokenVerify
}

