const express  = require('express')
const app = express()
const connectDB  = require('./DB/connect')
const urlRouter = require('./router/urls')
const {connectRedis}  = require('./config/redis-config')
require('dotenv').config()


app.use(express.static('public'))

app.use(express.json())
//router

app.use('/',urlRouter)


const port = process.env.PORT || 4000
const url = process.env.MONGO_URI

const start = async()=>{
    try{
      await connectDB(url)
      await connectRedis();
      app.listen(port,()=>{
        console.log(`server is listening at port ${port}`)
      })
    }catch(e){
        console.log(e);
    }
}
start()