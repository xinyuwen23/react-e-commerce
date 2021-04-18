const express = require('express')
const router = express.Router()

const Cart = require('../models').Cart

router.get('/list', (req, res) => {
  Cart.find({}, (err, doc) => {
    if (!err) {
      return res.json(doc)
    }
  })
})

router.post('/get_cart', (req, res) => {
  const { user } = req.body
  Cart.findOne({ user }, (err, doc) => {
    return res.json({ code: 0, cart: doc })
  })
})

// router.post('/add_to_cart', (req, res) => {
//   const { _id, item } = req.body
//   if (!user) {
//     res.json({ code: 1 })
//   }
//   const body = req.body
//   User.findByIdAndUpdate(userid, body, (err, doc) => {
//     const data = Object.assign(
//       {},
//       {
//         user: doc.user,
//         type: doc.type,
//       },
//       body
//     )
//     return res.json({ code: 0, data })
//   })
// })

module.exports = router
