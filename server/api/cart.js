const { Card } = require('antd')
const express = require('express')
const router = express.Router()

const models = require('../models')
const Cart = models.getModel('cart')

router.get('/list', (req, res) => {
  Cart.find({}, (err, doc) => {
    if (!err) {
      return res.json(doc)
    }
  })
})

// router.get('/get_cart', (req,res)=>{
//   const { _id } = req.cookies
//   Card.findOne({})
// })

// router.post('/upload', (req, res) => {
//   const { title, description, price, quantity, category } = req.body
//   const itemModel = new Item({
//     title,
//     description,
//     price,
//     quantity,
//     category,
//   })
//   itemModel.save((err, doc) => {
//     if (err) {
//       return res.json({ code: 1, message: 'Server error' })
//     }
//     return res.json({ code: 0, message: 'Success' })
//   })
// })

module.exports = router
