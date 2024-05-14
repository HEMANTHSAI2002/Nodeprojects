const schema = require('../models/zod_param_schema')

async function middlewareAddUser(req,res,next){
    const req_body = req.body
    const parsing = schema.postAddSchema.safeParse(req_body)
    if(parsing.success == false){
        const fields = parsing.error.errors
        const required_fields = []
        fields.forEach((e)=>{
            required_fields.push({
                "path":e.path[0],
                "message":e.message
            })
        })
        return res.status(400).json({required_fields})
    }
    next()
}

module.exports={
   middlewareAddUser
}

