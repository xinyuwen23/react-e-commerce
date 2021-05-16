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
  Help.find({})
    .populate('user')
    .exec((err, helpList) => {
      return res.json({ code: 0, helpList })
    })
})

router.post('/create_help', (req, res) => {
  const { _id } = req.cookies
  const { order, action, description, images } = req.body
  const help = new Help({
    user: _id,
    order,
    action,
    description,
    images,
  })
  help.save(() => {
    return res.json({ code: 0, message: "Request sent. We'll contact you soon" })
  })
})

module.exports = router
