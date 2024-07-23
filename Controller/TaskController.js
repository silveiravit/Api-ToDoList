const express = require('express')
const router = express.Router()
const Task = require('../Models/Task')
const yup = require('yup')
const auth = require('../middleware/auth')

router.get("/tasks", auth, async (req, res) => {
    const { id } = req.loggedUser
    const tasks = await Task.find({user: id})
    res.json(tasks)
})

router.post("/task", auth, async (req, res) => {
    const { id } = req.loggedUser
    const { taskName, date } = req.body
    const schema = yup.object().shape({
        taskName: yup.string().required(),
        date: yup.string().required()
    })
    if(!(await schema.isValid(req.body))){
        res.status(400).json({error: "Campos incorretos."})
    }
    const task = await Task.findOne({taskName, user: id})
    if(task == undefined){
        Task.create({
            taskName,
            date,
            user: id
        }).then(() => {
            res.status(200).json({message: "Tarefa criada."})
        }).catch(() => {
            res.status(400).json({error: "Não foi possível criar a tarefa."})
        })
    }else{
        res.status(401).json({message: "Essa tarefa já existe."})
    }
})

router.put("/task", (req, res) => {

})

router.delete("/task/:id", auth, async (req, res) => {
    const { id } = req.params
    await Task.findByIdAndDelete({_id: id})
    res.json({message: "Tarefa excluída."})
})

module.exports = router