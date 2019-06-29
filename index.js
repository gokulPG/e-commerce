const express = require('express')
const cors = require('cors')

const app = express()
const port = 3005

const {mongoose} = require('./config/database')
const {userRouter} = require('./app/controllers/userController')
const {addressRouter} = require('./app/controllers/addressController')
const {categoryRouter} =  require('./app/controllers/categoryController')

app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/address', addressRouter)
app.use('/category', categoryRouter)

// app.get('/', (req,res) => {
//     res.send('welcome to Employee webiste')
// })


app.listen(port,()=>{
    console.log('listening to port',port)
})