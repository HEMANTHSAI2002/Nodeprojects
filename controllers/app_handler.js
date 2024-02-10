const {User} = require('../models/app_schema')


async function handlerGetList(req,res){
    const all_users = await User.find({})
    return res.json(all_users)
}

async function handlerGetHtmlList (req,res){
    const all_users = await User.find({})
    const html = `
    <ul>
    ${all_users.map((user)=>`<li>${user.first_name} ID:${user._id}</li>`).join(" ")}
    </ul>
    `
    return res.send(html)
}

async function handlerGetUserByID(req,res){
    const req_user = await User.findById(req.params.id)
    if(!req_user){
        res.json({"message" : "Please send a valid input"})
    }
    else{
        res.json(req_user)
    }
}

async function handlerPostAddUser(req,res){
    const body = req.body
    console.log(body)
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
}

async function handlerDeleteUser(req,res){
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Selected User Deleted"})
}

async function handlerPatchUser(req,res){
    const body = req.body
    await User.findByIdAndUpdate(req.params.id,{
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        gender:req.body.gender,
        ip_address:req.body.ip_address
    })
    res.status(201).json({msg:"Updated the Required User"})
}



module.exports={
    handlerGetList,
    handlerGetHtmlList,
    handlerGetUserByID,
    handlerPostAddUser,
    handlerDeleteUser,
    handlerPatchUser
}

