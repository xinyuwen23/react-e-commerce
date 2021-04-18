const express = require('express')
const router = express.Router()

const Cart = require('../models').Cart
// const Item = require('../models').Item

const updateCart = (cart, item, quantity) => {
  cart.quantity += quantity
  const items = cart.items
  const targetItem = items.find(i => i.item == item)
  const targetIndex = items.indexOf(targetItem)
  if (targetItem) {
    const targetItemQuantity = targetItem.quantity
    Object.assign(targetItem, { quantity: targetItemQuantity + quantity })
    items.splice(targetIndex, 1, targetItem)
    return cart
  } else {
    const newItem = { item, quantity }
    items.push(newItem)
    return cart
  }
}

router.get('/list', (req, res) => {
  Cart.find({}, (err, doc) => {
    if (!err) {
      return res.json(doc)
    }
  })
})

router.get('/get_cart', (req, res) => {
  const { _id } = req.cookies
  Cart.findOne({ user: _id }, (err, doc) => {
    return res.json({ code: 0, cart: doc })
  })
})

router.post('/update_cart', (req, res) => {
  const { _id } = req.cookies
  const { item, quantity } = req.body
  Cart.findOne({ user: _id }, (err, doc) => {
    updateCart(doc, item, quantity)
    Cart.findOneAndUpdate({ user: _id }, doc, { new: true }, (err, doc) => {
      const { _id, user, price, quantity, items } = doc
      return res.json({ code: 0, cart: { _id, user, price, quantity, items } })
    })
  })
})

module.exports = router
