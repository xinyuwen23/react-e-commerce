const express = require('express')
const router = express.Router()
const utils = require('utility')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const User = require('../models').User
const Cart = require('../models').Cart

const _userFilter = { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }
const _cartFilter = { __v: 0, createdAt: 0, updatedAt: 0 }

router.get('/list', (req, res) => {
  User.find({}, _userFilter, (err, doc) => {
    return res.json(doc)
  })
})

router.get('/get_user', (req, res) => {
  const { _id } = req.cookies
  if (!_id) {
    return res.json({ code: 1 })
  }
  User.findOne({ _id }, _userFilter, (err, doc) => {
    const user = doc
    Cart.findOne({ user: _id }, _cartFilter, (err, doc) => {
      const cart = doc
      return res.json({ code: 0, user, cart })
    })
  })
})

router.post('/register', (req, res) => {
  const { email, name, password, isSeller } = req.body
  User.findOne({ email }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, message: 'Email already exists' })
    }
    const user = new User({
      email,
      name,
      password: md5Password(password),
      isSeller,
    })
    user.save((err, doc) => {
      const cart = new Cart({ user, price: 0, quantity: 0, items: [] })
      cart.save((err, cart) => {
        const { email, name, isSeller, _id } = doc
        const { user, price, quantity, items } = cart
        res.cookie('_id', _id)
        return res.json({
          code: 0,
          user: { email, name, isSeller, _id },
          cart: { user, price, quantity, items },
          message: `Welcome, ${name}`,
        })
      })
    })
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email, password: md5Password(password) }, _userFilter, (err, user) => {
    if (!user) {
      return res.json({ code: 1, message: 'Wrong password' })
    }
    const { _id, name } = user
    res.cookie('_id', _id)
    Cart.findOne({ user: _id }, _cartFilter, (err, cart) => {
      return res.json({ code: 0, user, cart, message: `Welcome, ${name}` })
    })
  })
})

router.post('/googleLogin', async (req, res) => {
  const { tokenId } = req.body
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.CLIENT_ID,
  })
  const { name } = ticket.getPayload()
  console.log(JSON.stringify(ticket.getPayload()))
  User.findOne({ tokenId }, (err, doc) => {
    if (!doc) {
      const user = new User({
        tokenId,
        name,
        isSeller: false,
        isAdmin: false,
      })
      user.save((err, newUser) => {
        const cart = new Cart({ user: newUser, price: 0, quantity: 0, items: [] })
        cart.save((err, cart) => {
          res.cookie('_id', newUser._id)
          return res.json({
            code: 0,
            user: newUser,
            cart,
            message: `Welcome, ${newUser.name}`,
          })
        })
      })
    } else {
      res.cookie('_id', doc._id)
      Cart.findOne({ user: doc._id }, _cartFilter, (err, cart) => {
        return res.json({ code: 0, user: doc, cart, message: `Welcome, ${doc.name}` })
      })
    }
  })
})

// helper functions

const md5Password = password => {
  const salt = 'iXVsiTtV3t5S9hiS01lWrSIANGVjzMFt'
  return utils.md5(utils.md5(password + salt))
}

module.exports = router
