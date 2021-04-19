const express = require('express')
const router = express.Router()

const Order = require('../models').Order
const Cart = require('../models').Cart

router.get('/list', (req, res) => {
  Order.find({}, (err, address) => {
    return res.json(address)
  })
})

router.get('/get_orders', (req, res) => {
  const { _id } = req.cookies
  Order.find({ user: _id }, (req, doc) => {
    return res.json({ code: 0, orderList: doc })
  })
})

router.post('/get_order', (req, res) => {
  const { _id } = req.body
  Order.findOne({ _id }, (req, doc) => {
    return res.json({ code: 0, order: doc })
  })
})

router.post('/create_order', (req, res) => {
  const { _id } = req.cookies
  const { price, items, shippingCost, address } = req.body
  const total = shippingCost + price
  const order = new Order({
    user: _id,
    items,
    address,
    subtotal: price,
    shippingCost,
    total,
  })
  order.save(() => {
    Order.find({ user: _id }, (req, orderList) => {
      Cart.findOne({ user: _id }, (err, cart) => {
        emptyCart(cart)
        Cart.findOneAndUpdate({ user: _id }, cart, { new: true }, (err, newCart) => {
          return res.json({ code: 0, cart: newCart, orderList })
        })
      })
    })
  })
})

const emptyCart = cart => {
  cart.quantity = 0
  cart.price = 0
  cart.items = []
  return cart
}

module.exports = router
