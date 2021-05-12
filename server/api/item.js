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
  Item.findOne({ _id }, (err, item) => {
    User.findOne({ _id: item.seller }, (err, user) => {
      const { _id, title, description, price, category, images, quantity, sold } = item
      const seller = user.name
      return res.json({
        code: 0,
        item: { _id, title, description, price, category, images, quantity, sold, seller },
      })
    })
  })
})

router.post('/filter_items', (req, res) => {
  const { category } = req.body
  Item.find({ category }, (err, items) => {
    return res.json({ code: 0, itemList: items })
  })
})

router.post('/upload_item', (req, res) => {
  const { _id } = req.cookies
  const { title, description, price, quantity, category, images } = req.body
  const item = new Item({
    title,
    description,
    price,
    quantity,
    category,
    seller: _id,
    images,
  })
  item.save(() => {
    return res.json({ code: 0, message: 'Item added' })
  })
})

module.exports = router
