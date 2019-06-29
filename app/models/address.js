const mongoose = require('mongoose')

const Schema=mongoose.Schema

const AddressSchema = new Schema({
    street:{
        type:String,
        required:true
    },
    city:{
        type: String,
        required: true
    },
    pin:{
        type: Number,
        required: true
    },
    landmark:{
        type: String,
        required: true 
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Address = mongoose.model('Address', AddressSchema )

module.exports = Address