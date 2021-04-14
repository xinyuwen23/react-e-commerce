const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 4000

const buildPath = path.join(__dirname, '..', 'build')
app.use(express.static(buildPath))

app.get('/api', (req, res) => {
  res.send('API Page')
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
