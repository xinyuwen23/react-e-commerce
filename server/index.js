const express = require('express')
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')

const app = express()
const server = require('http').Server(app)

// const models = require('./models')

// const userRouter = require('./user')
// const chatRouter = require('./chat')

// app.use(cookieParser())
// app.use('/user', userRouter)
// app.use('/chat', chatRouter)

app.get('/', (req, res) => {
  res.send('E-Commerce Server Page')
})

server.listen(process.env.PORT || 4000)
