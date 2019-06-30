const express  = require('express')
const router = express.Router()
const Cart = require('../models/cartLineItem')
const {authenticateUser} = require('../middlewares/authentication')

//all the CartLineItem CRUD operations can be done by the User after login

//getData
router.get('/', authenticateUser, (req,res) => {
    const {user} = req
    Cart.find({
        user: user._id
    }).populate('product', ['name'])
    .then((cart) => {
            res.send(cart)
    })
    .catch((err) => {
        res.send(err)
    })
})

//create
router.post('/', authenticateUser,(req,res) => {
    const {user} = req
    const body = req.body
    const cart = new Cart(body)
    cart.user  = user._id
    cart.save()
        .then((cart) => {
             res.send(cart)
        })
        .catch((err) => {
            res.send(err)
        })
})

//update

router.put('/:id', authenticateUser, (req,res) => {
    const {user} = req
    const id = req.params.id
    const body = req.body
    Cart.findOneAndUpdate({ _id:id, user:user._id}, {$set:body}, {new:true, runValidators:true})
        .then((cart) => {
            res.send(cart)
        })
        .catch((err) => {
            res.send(err)
        })
})

//delete

router.delete('/:id', authenticateUser, (req,res) => {
    const {user} = req
    const id = req.params.id
        Cart.findByIdAndDelete({_id:id, user:user._id})
            .then((cart) => {
                res.send(cart)
            })
            .catch((err) => {
                res.send(err)
            })
})

module.exports = {
    cartRouter: router
}
