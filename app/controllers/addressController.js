const express = require('express')
const Address = require('../models/address')
const router = express.Router()
const {authenticateUser} = require('../middlewares/authentication')


router.get('/', authenticateUser, (req, res) => {
    const {user} = req
    Address.find({user: user._id})
        .then(address => {
            res.send(address)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post('/', authenticateUser, (req,res)=>{
    const {user} = req
    const body = req.body
    const address = new Address(body)
    address.user = user._id
    address.save()
    .then((address) => {
        res.json(address)
    })
    .catch((err) => {
        res.json(err)
    })
})

router.put('/:id', authenticateUser, (req,res) => {
    const {user} = req
    const id = req.params.id
    const body = req.body
    Address.findOneAndUpdate({ _id:id, user:user._id}, {$set:body}, {new:true, runValidators:true})
        .then((address)=>{
            if(!address){
                res.json({})
            }
            res.json(address)
        })
        .catch((err)=>{
            res.json(err)
        })
})

router.delete('/:id' , (req,res) => {
    const {user} = req
    const id = req.params.id
    const body = req.body
    Address.findByIdAndDelete({
        _id:id,
        user:user._id
    })
    .then((address)=>{
        if(!address){
            res.json({})
        }
        res.json(address)
    })
    .catch((err)=>{
        res.json(err)
    })
})

module.exports = {
    addressRouter: router
}
