const mongoose = require('mongoose')

const Schema  = mongoose.Schema

const CartSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity:{
        type: String,
        required: true
    }
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart