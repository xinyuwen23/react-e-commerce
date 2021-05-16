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

router.post('/mark_help', (req, res) => {
  const { help } = req.body
  Help.findOne({ _id: help._id }, (err, doc) => {
    let newHelp = doc
    newHelp.isSolved = true
    Help.findOneAndUpdate({ _id: help._id }, newHelp, () => {
      Help.find({}, (err, doc) => {
        return res.json({ code: 0, helpList: doc })
      })
    })
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
