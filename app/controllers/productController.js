const express = require('express')
const  Product = require('../models/product')
const router = express.Router()
const {authenticateUser} = require('../middlewares/authentication')
const {authorizeUser} = require('../middlewares/authorization')

// to get all the products
router.get('/',(req,res) => {
    Product.find()
        .then(Product => {
            res.send(Product)
        })
        .catch(err => {
            res.send(err)
        })
})  

router.get('/:id',(req,res) => {
    const id = req.params.id
    Product.findOne({_id:id}).populate('category', ['name'])
        .then((product)=> {
            if(!product){
                res.json({})
            }
            res.json(product)
        })
        .catch((err)=>{
            res.json(err)
        })
})  

//post a product
router.post('/', authenticateUser, authorizeUser, (req,res) => { 
    const body = req.body
    const product = new Product(body)
    product.save()
    .then((product) => {
        res.json(product)
    })
    .catch((err) => {
        res.json(err)
    })
})

router.delete('/:id', authenticateUser, authorizeUser,(req,res) => {
    const id = req.params.id
    Product.findByIdAndDelete({
        _id:id,
    })
    .then((product)=> {
        if(!product){
            res.json({})
        }
        res.json(product)
    })
    .catch((err)=>{
        res.json(err)
    })
})

module.exports = {
    productRouter: router
}



