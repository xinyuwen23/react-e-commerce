const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

const PORT = process.env.PORT || 4000

const buildPath = path.join(__dirname, '..', 'build')
app.use(express.static(buildPath))

const authRouter = require('./api/auth')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
