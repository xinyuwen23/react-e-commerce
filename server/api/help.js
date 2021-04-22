const express = require('express')
const router = express.Router()

const Help = require('../models').Help

router.get('/list', (req, res) => {
  Help.find({}, (err, doc) => {
    if (!err) {
      return res.json(doc)
    }
  })
})

router.get('/get_helps', (req, res) => {
  Order.find({}, (err, doc) => {
    return res.json({ code: 0, helpList: doc })
  })
})

router.post('/get_help', (req, res) => {
  const { _id } = req.body
  Help.findOne({ _id }, (err, doc) => {
    return res.json({ code: 0, help: doc })
  })
})

router.post('/create_help', (req, res) => {
  const { _id } = req.cookies
  const { order, description, images } = req.body
  const help = new Help({
    user: _id,
    order,
    description,
    images,
  })
  help.save(() => {
    return res.json({ code: 0, message: "Help sent. We'll contact you soon" })
  })
})

module.exports = router
