const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageURL:{
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product