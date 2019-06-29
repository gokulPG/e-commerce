const express = require('express')
const Review = require('../models/review')
const router = express.Router()
const {authenticateUser} = require('../middlewares/authentication')
const {authorizeUser} = require('../middlewares/authorization')


router.get('/', authenticateUser, (req, res) => {
    const {user} = req
    Review.find({user: user._id})
        .then(Review => {
            res.send(Review)
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/:id', authenticateUser, (req,res) => {
    const id = req.params.id
    const {user} = req
    Review.findOne({
        _id:id,
        user: user._id
    }).populate('product', ['name'])
        .then((review)=> {
            if(!review){
                res.json({})
            }
            res.json(review)
        })
        .catch((err)=>{
            res.json(err)
        })
})  

router.post('/', authenticateUser, (req,res)=>{
    const {user} = req
    const body = req.body
    const review = new Review(body)
    review.user = user._id
    review.save()
    .then((review) => {
        res.json(review)
    })
    .catch((err) => {
        res.json(err)
    })
})

//delete user's review option is only given to admin
router.delete('/:id', authenticateUser, authorizeUser,(req,res) => {
    const {user} = req
    const id = req.params.id
    Review.findByIdAndDelete({
        _id:id,
        user: user._id
    })
    .then((review)=> {
        if(!review){
            res.json({})
        }
        res.json(review)
    })
    .catch((err)=>{
        res.json(err)
    })
})

module.exports = {
    reviewRouter: router
}

