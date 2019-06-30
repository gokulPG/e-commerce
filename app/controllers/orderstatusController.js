const express = require('express')
const router = express.Router()
const Status = require('../models/orderStatus')
const {authenticateUser} = require('../middlewares/authentication')


//get the status of the order for the user

router.get('/', authenticateUser, (req, res) => {
    const {user} = req
    Status.find({user: user._id}).populate('order').populate('user', ['username'])
        .then(status => {
            res.send(status)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/', authenticateUser, (req,res)=>{
    const {user} = req
    const body = req.body
    const status = new Status(body)
    status.user = user._id
    status.save()
        .then((status) => {
            res.json(status)
        })
        .catch((err) => {
            res.json(err)
        })
})

module.exports = {
    statusRouter: router
}