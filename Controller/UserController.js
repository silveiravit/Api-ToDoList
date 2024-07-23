const express = require('express')
const router = express.Router()
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const yup = require('yup')
const bcrypt = require('bcrypt')

router.post("/user", async (req, res) => {
    const { email, password } = req.body
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    })
    if(!(await schema.isValid(req.body))){
        res.status(400).json({error: "Falha ao validar os campos."})
    }
    const user = await User.findOne({email})
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(password, salt)
    if(!user){
        User.create({
            email,
            password: hash
        })
        res.status(200).json({message: "Usuário criado."})
    }else{
        res.status(401).json({error: "E-mail já existe no sistema."})
    }
})

router.post("/auth", async (req, res) => {
    const { email, password } = req.body
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    })
    if(!(await schema.isValid(req.body))){
        res.status(400).json({error: "Falha ao validar os campos."})
    }
    const user = await User.findOne({email})
    if(user){
        const correctHash = bcrypt.compareSync(password, user.password)
        if(correctHash){
            jwt.sign({id: user._id, email: user.email}, "tokenToDoList", {expiresIn: "1h"}, (err, token) => {
                if(err){
                    res.status(400)
                    res.json({err: "Falha interna!"})
                }else{
                    res.status(200)
                    res.json({token})
                }
            })
        }else{
            res.status(401).json({error: "Verifique o e-mail e a senha."})
        }
    }
})

module.exports = router