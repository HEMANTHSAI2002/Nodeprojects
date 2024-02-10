const mongoose = require('mongoose')

async function connectMongo(url){
    mongoose.connect(url).then(()=> console.log("Connected")).catch((e)=>console.log(e))

}

module.exports={
    connectMongo
}
