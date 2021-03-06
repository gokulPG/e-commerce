const express = require('express')
const cors = require('cors')

const app = express()
const port = 3005

const {mongoose} = require('./config/database')
const {userRouter} = require('./app/controllers/userController')
const {addressRouter} = require('./app/controllers/addressController')
const {categoryRouter} =  require('./app/controllers/categoryController')
const {productRouter} = require('./app/controllers/productController')
const {reviewRouter} = require('./app/controllers/reviewController')
const {cartRouter} = require('./app/controllers/cartController')
const {orderRouter} = require('./app/controllers/orderController')
const {statusRouter} = require('./app/controllers/orderstatusController')

app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/address', addressRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/review', reviewRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/status', statusRouter)

// app.get('/', (req,res) => {
//     res.send('welcome to Employee webiste')
// })

app.listen(port,()=>{
    console.log('listening to port',port)
})