const express = require('express')
const router = express.Router()

const models = require('../models')
const User = models.getModel('user')

const _filter = { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }

router.get('/list', (req, res) => {
  console.log(req.body)
  console.log(req.cookies)
  User.find({}, _filter, (err, doc) => {
    if (!err) {
      return res.json(doc)
    }
  })
})

// router.post('/register', (req, res) => {
//   const { username, password } = req.body
//   User.findOne({ username }, (err, doc) => {
//     if (doc) {
//       return res.json({ code: 1, message: 'Username already exists' })
//     }
//     const userModel = new User({
//       username,
//       password: md5Password(password),
//     })
//     userModel.save((err, doc) => {
//       if (err) {
//         return res.json({ code: 1, message: 'Server error' })
//       }
//       const { username, _id } = doc
//       res.cookie('userid', _id)
//       return res.json({ code: 0, data: { username, _id } })
//     })
//   })
// })

module.exports = router
