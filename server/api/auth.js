const express = require('express')
const router = express.Router()
const utils = require('utility')

const models = require('../models')
const User = models.getModel('user')

const _userDataFilter = { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }

router.get('/list', (req, res) => {
  User.find({}, _userDataFilter, (err, doc) => {
    if (!err) {
      return res.json(doc)
    }
  })
})

router.get('/get_user', (req, res) => {
  console.log(req.cookies)
  const { _id } = req.cookies
  if (!_id) {
    res.json({ code: 1 })
  }
  User.findOne({ _id }, _userDataFilter, (err, doc) => {
    if (!err) {
      return res.json({ code: 0, user: doc })
    }
  })
})

router.post('/register', (req, res) => {
  const { email, name, password, isSeller } = req.body
  console.log(email)
  User.findOne({ email }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, message: 'Email already exists' })
    }
    const userModel = new User({
      email,
      name,
      password: md5Password(password),
      isSeller,
    })
    userModel.save((err, doc) => {
      if (err) {
        return res.json({ code: 1, message: 'Server error' })
      }
      const { email, name, isSeller, _id } = doc
      res.cookie('_id', _id)
      return res.json({
        code: 0,
        user: { email, name, isSeller, _id },
        message: `Welcome, ${name}`,
      })
    })
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({ email, password: md5Password(password) }, _userDataFilter, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, message: 'Wrong password' })
    }
    const { name, _id } = doc
    res.cookie('_id', _id)
    return res.json({ code: 0, user: doc, message: `Welcome, ${name}` })
  })
})

const md5Password = password => {
  const salt = 'iXVsiTtV3t5S9hiS01lWrSIANGVjzMFt'
  return utils.md5(utils.md5(password + salt))
}

module.exports = router
