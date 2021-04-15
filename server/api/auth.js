const express = require('express')
const router = express.Router()

const models = require('../models')
const User = models.getModel('user')

const _filter = { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }

router.get('/list', (req, res) => {
  User.find({}, _filter, (err, doc) => {
    if (!err) {
      return res.json(doc)
    }
  })
})

module.exports = router
