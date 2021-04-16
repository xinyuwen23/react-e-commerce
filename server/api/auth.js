const express = require('express')
const router = express.Router()
const utils = require('utility')

const models = require('../models')
const User = models.getModel('user')

const _filter = { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }

router.get('/list', (req, res) => {
  User.find({}, _filter, (err, doc) => {
    if (!err) {
      return res.json(doc)
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
        return res.json({ code: 1, message: 'Server Error' })
      }
      const { email, name, isSeller, _id } = doc
      res.cookie(_id)
      return res.json({ code: 0, user: { email, name, isSeller, _id } })
    })
  })
})

router.post('/login', (req, res) => {
  console.log('Login')
  console.log(req.body)
  console.log(req.cookies)
})

const md5Password = password => {
  const salt = 'iXVsiTtV3t5S9hiS01lWrSIANGVjzMFt'
  return utils.md5(utils.md5(password + salt))
}

module.exports = router
