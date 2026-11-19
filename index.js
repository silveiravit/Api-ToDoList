const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserController = require('./Controller/UserController')
const TaskController = require('./Controller/TaskController')
const cors = require('cors')
const env = require('dotenv').config()
const uri = process.env.MONGODB_URI
const port = process.env.PORT || 3000

if(!uri){
    console.error('Erro: MONGODB_URI não definida no arquivo .env');
    process.exit(1);
}

try{
    mongoose.connect(uri).then(() => {
        console.log('Conectado ao MongoDB Atlas');
        app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))
    })
}catch(err){
    console.log(err)
}

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/", UserController)
app.use("/", TaskController)

app.listen(1010, () => { console.log("Running server!") })