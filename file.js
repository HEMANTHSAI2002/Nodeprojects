const fs = require("fs")
const express = require("express")
let users = require('./User_Data.json')
const mongoose = require('mongoose')
const app = express()


app.use(express.urlencoded({extended:false}))

app.get('/app/list',(req,res)=>{
    return res.json(users)
})

app.get('/html/list',(req,res)=>{
    const html = `
    <ul>
    ${users.map((user)=>`<li>${user.first_name} ID:${user.id}</li>`).join(" ")}
    </ul>
    `
    return res.send(html)
})

app.get('/app/list/:id',(req,res)=>{
    let id = Number(req.params.id)
    const result = users.find((user)=>user.id===id)
    if(!result){
        res.json({"message" : "Please send a valid input"})
    }
    else{
    res.json(result)
    }
})

app.post('/app/add',(req,res)=>{
    const body = req.body
    users.push({...body,id:users.length+1})
    fs.writeFile('./User_Data.json',JSON.stringify(users),(err,data)=>{
        return res.json({"Message":"Success"})
    })
})

app.delete('/app/delete/:id',(req,res)=>{
    const id = Number(req.params.id)
    const updatedusers = users.filter((user)=>user.id!==id)
    fs.writeFile('./User_Data.json',JSON.stringify(updatedusers),(err,data)=>{
        res.send("User Deleted")
    })
})

app.patch('/app/patch/:id',(req,res)=>{
    const id_req = Number(req.params.id)
    const body = req.body
    users = users.filter((i)=>i.id!==id_req)
    users.push({...body,id:id_req})
    fs.writeFile('User_Data.json',JSON.stringify(users),(err,data)=>{
        res.send("User Updated Successfully !")
    })
})
app.listen(5000,()=>{
    console.log("Server Running !")
})

// app.get('/list',(req,res)=>{
//    return res.json(user)
// })

// app.post('/add/:id',(req,res)=>{
//     const body = req.body
//     user.push(body)
//     fs.writeFile("./UserData.json",JSON.stringify(user),(err)=>{
//         if(err){
//           console.log(err)
//         }
//     })
//     fs.writeFile('./new.json',JSON.stringify())
//     return res.send("sent successfully")
// })

// app.listen(8000,()=>{
//     console.log("Server Started !")
// })