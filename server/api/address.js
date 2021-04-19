const express = require('express')
const router = express.Router()

const Address = require('../models').Address

router.get('/list', (req, res) => {
  Address.find({}, (err, address) => {
    return res.json(address)
  })
})

router.get('/get_addresses', (req, res) => {
  const { _id } = req.cookies
  Address.find({ user: _id }, (req, addressList) => {
    return res.json({ code: 0, addressList })
  })
})

router.post('/add_address', (req, res) => {
  const { _id } = req.cookies
  const { name, address, city, state, zip, region } = req.body
  const newAddress = new Address({
    user: _id,
    name,
    address,
    city,
    state,
    zip,
    region,
  })
  newAddress.save((err, doc) => {
    const { user, name, address, city, state, zip, region } = doc
    return res.json({
      code: 0,
      address: { user, name, address, city, state, zip, region },
      message: 'Address added',
    })
  })
})

module.exports = router
