const express = require("express")
const app = express()
const {connectMongo} = require("./connection")
const appRouter = require('./routes/app_route')

app.use(express.urlencoded({extended:false}))

connectMongo("mongodb://127.0.0.1:27017/Node_DB").then(()=>console.log("Connection Success")).catch((e)=>{console.log(e)})

app.use('/app',appRouter)

app.listen(5000,()=>{
    console.log("Server Running !")
})
