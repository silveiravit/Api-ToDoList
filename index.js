const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserController = require('./Controller/UserController')
const TaskController = require('./Controller/TaskController')
const cors = require('cors')

try{
    mongoose.connect('link da conexão mongodb')
}catch(err){
    console.log(err)
}

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/", UserController)
app.use("/", TaskController)

app.listen(1010, () => { console.log("Running server!") })