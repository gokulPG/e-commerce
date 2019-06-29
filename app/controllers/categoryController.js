const express = require('express')
const Category = require('../models/category')
const router = express.Router()
const {authenticateUser} = require('../middlewares/authentication')
const {authorizeUser} = require('../middlewares/authorization')

router.get('/',(req,res) => {
    Category.find()
        .then(Category => {
            res.send(Category)
        })
        .catch(err => {
            res.send(err)
        })
})  

router.post('/', authenticateUser, authorizeUser, (req,res) => { 
    const body = req.body
    const category = new Category(body)
    category.save()
    .then((category) => {
        res.json(category)
    })
    .catch((err) => {
        res.json(err)
    })
})

router.delete('/:id', authenticateUser, authorizeUser,(req,res) => {
    const id = req.params.id
    Category.findByIdAndDelete({
        _id:id,
    })
    .then((category)=> {
        if(!category){
            res.json({})
        }
        res.json(category)
    })
    .catch((err)=>{
        res.json(err)
    })
})


module.exports = {
    categoryRouter: router
}
