const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { authenticationUser } = require('../middlewares/authentication')

//localhost:3007/users/register

router.post('/register', (req,res) =>{
    const user = new User(req.body)
    user.save()
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
})

// localhost:3007/users/login

router.post('/login',(req,res)=>{
    const body=req.body

    User.findByCredentials(body.email, body.password)
    .then((user)=>{
        return user.generateToken()
        // res.send(user)
    })
    .then((token)=>{
        console.log(token)
        res.send({token})
    //    res.header('x-auth',token).send()
    })
    .catch((err)=>{
        res.send(err)
    })
})

// // need to authenticate before you open your account and logout
// router.get('/account', authenticationUser, function(req, res) {
//     const { user } = req
//     res.send(user)
// })

// localhost:3005/users/logout
router.delete('/logout', authenticationUser, function(req, res) {
    const { user, token } = req
    User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
        .then(() => {
            res.send({ notice: 'successfully logged out' })
        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = {
    userRouter: router}