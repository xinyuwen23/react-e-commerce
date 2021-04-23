const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()

const authRouter = require('./api/auth')
const itemRouter = require('./api/item')
const cartRouter = require('./api/cart')
const addressRouter = require('./api/address')
const orderRouter = require('./api/order')
const helpRouter = require('./api/help')

const app = express()

const PORT = process.env.PORT || 4000

const buildPath = path.join(__dirname, '..', 'build')
app.use(express.static(buildPath))

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/auth', authRouter)
app.use('/item', itemRouter)
app.use('/cart', cartRouter)
app.use('/address', addressRouter)
app.use('/order', orderRouter)
app.use('/help', helpRouter)

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
