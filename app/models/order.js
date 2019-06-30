const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    paymentMethod:{
        type: String,
        required: true
    },
    total:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    orderLineItems: [
        {
            product:{
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity:{
                type: String,
                required: true
            } 
        }
    ]
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order