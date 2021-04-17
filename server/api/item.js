const express = require('express')
const router = express.Router()

const models = require('../models')
const Item = models.getModel('item')

router.get('/list', (req, res) => {
  Item.find({}, (err, doc) => {
    if (!err) {
      return res.json(doc)
    }
  })
})

router.post('/get_item', (req, res) => {
  const { _id } = req.body
  Item.findOne({ _id }, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, message: "Couldn't find item" })
    }
    return res.json({ code: 0, item: doc, message: 'Success' })
  })
})

router.post('/upload', (req, res) => {
  const { title, description, price, quantity, category } = req.body
  const itemModel = new Item({
    title,
    description,
    price,
    quantity,
    category,
  })
  itemModel.save((err, doc) => {
    if (err) {
      return res.json({ code: 1, message: 'Server error' })
    }
    return res.json({ code: 0, message: 'Success' })
  })
})

module.exports = router
