const express = require('express')
const router = express.Router()

const Item = require('../models').Item
const User = require('../models').User

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
    const item = doc
    User.findOne({ _id: item.seller }, (err, doc) => {
      const { _id, title, description, price, category } = item
      const seller = doc.name
      return res.json({ code: 0, item: { _id, title, description, price, category, seller } })
    })
  })
})

router.post('/upload_item', (req, res) => {
  const { title, description, price, quantity, category, seller } = req.body
  const item = new Item({
    title,
    description,
    price,
    quantity,
    category,
    seller,
  })
  item.save((err, doc) => {
    return res.json({ code: 0, message: 'Success' })
  })
})

module.exports = router
