const express = require('express')
const router = express.Router()

const Cart = require('../models').Cart
const Item = require('../models').Item

router.get('/list', (req, res) => {
  Cart.find({}, (err, doc) => {
    if (!err) {
      return res.json(doc)
    }
  })
})

router.get('/get_cart', (req, res) => {
  const { _id } = req.cookies
  Cart.findOne({ user: _id }).exec((err, cart) => {
    const { _id, user, price, quantity, items } = cart
    return res.json({ code: 0, cart: { _id, user, price, quantity, items } })
  })
})

router.post('/update_cart', (req, res) => {
  const { _id } = req.cookies
  const { item, quantity } = req.body
  Item.findOne({ _id: item }, (err, target) => {
    const price = target.price
    const title = target.title
    const image = target.images[0]
    Cart.findOne({ user: _id }, (err, cart) => {
      updateCart(cart, item, quantity, price, title, image)
      Cart.findOneAndUpdate({ user: _id }, cart, { new: true }, (err, doc) => {
        return res.json({ code: 0, cart: doc })
      })
    })
  })
})

router.get('/empty_cart', (req, res) => {
  const { _id } = req.cookies
  Cart.findOne({ user: _id }, (err, doc) => {
    emptyCart(doc)
    Cart.findOneAndUpdate({ user: _id }, doc, { new: true }, (err, doc) => {
      const { _id, user, price, quantity, items } = doc
      return res.json({ code: 0, cart: { _id, user, price, quantity, items } })
    })
  })
})

// helper functions

const updateCart = (cart, item, quantity, price, title, image) => {
  cart.quantity += quantity
  cart.price += price * quantity
  const items = cart.items
  const targetItem = items.find(i => i.item == item)
  const targetIndex = items.indexOf(targetItem)
  if (targetItem) {
    const targetItemQuantity = targetItem.quantity
    Object.assign(targetItem, { quantity: targetItemQuantity + quantity })
    items.splice(targetIndex, 1, targetItem)
    return cart
  } else {
    const newItem = { item, quantity, price, title, image }
    items.push(newItem)
    return cart
  }
}

const emptyCart = cart => {
  cart.quantity = 0
  cart.price = 0
  cart.items = []
  return cart
}

module.exports = router
