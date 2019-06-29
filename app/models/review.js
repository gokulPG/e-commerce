const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required:true
    },
    rating:{
        type: Number,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }

})

const Review = mongoose.model('Review', ReviewSchema) 

module.exports = Review

