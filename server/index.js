const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const authRouter = require('./api/auth')
const itemRouter = require('./api/item')
const cartRouter = require('./api/cart')
const addressRouter = require('./api/address')

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

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
