const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/ecommerce-app', {useNewUrlParser: true}) 
        .then(() => {
            console.log("db connected successfully")
        })
        .catch((err) => {
            console.log("Error connecting to DB" , err)
        })

module.exports  = {mongoose}
