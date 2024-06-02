const express = require("express")
const app = express()
const {connectMongo} = require("./connection")
require('dotenv').config();
const appRouter = require('./routes/app_route')
const loginRouter = require('./routes/login_route')

app.use(express.urlencoded({extended:false}))

connectMongo(process.env.Mongo_DB_Connection_String).then(()=>console.log("Connection Success")).catch((e)=>{console.log(e)})

app.use('/app',appRouter)
app.use('/login',loginRouter)

app.listen(5000,()=>{
    console.log("Server Running !")
})
