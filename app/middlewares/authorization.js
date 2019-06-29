const User = require('../models/user')

const authorizeUser = function(req,res,next){
            console.log(req)
            const {user} =  req
            console.log(user.isAdmin)
            const isAdmin = user.isAdmin
            if(isAdmin){
                next()
            }else{
                res.status('401').send('not an admin')
            }
}

module.exports = {
    authorizeUser
}