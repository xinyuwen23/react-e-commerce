const express = require('express')
const path = require('path')
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const app = express()

const PORT = process.env.PORT || 4000

const buildPath = path.join(__dirname, '..', 'build')
app.use(express.static(buildPath))

// const models = require('./models')

// const userRouter = require('./user')
// const chatRouter = require('./chat')

// app.use(cookieParser())
// app.use('/user', userRouter)
// app.use('/chat', chatRouter)

app.get('/api', (req, res) => {
  res.send('E-Commerce Server API Page')
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
