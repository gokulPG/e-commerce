const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StatusSchema = new Schema({
    order:{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    name:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const Status = mongoose.model('OrderStatus', StatusSchema)

module.exports = Status