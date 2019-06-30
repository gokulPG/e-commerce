const express = require('express')
const router = express.Router()
const Order = require('../models/order')

const {authenticateUser} = require('../middlewares/authentication')

//get, post, update order
router.get('/', authenticateUser, (req, res) => {
    const {user} = req
    Order.find({user: user._id}).populate('address').populate('orderLineItems.product').populate('user', ['username'])
        .then(Order => {
            res.send(Order)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/', authenticateUser, (req,res)=>{
    const {user} = req
    const body = req.body
    const order = new Order(body)
    order.user = user._id
    order.save()
    .then((order) => {
        res.json(order)
    })
    .catch((err) => {
        res.json(err)
    })
})

module.exports = {
    orderRouter: router
}