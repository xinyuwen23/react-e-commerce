const express = require('express')
const router = express.Router()

const models = require('../models')
const Cart = models.getModel('cart')

module.exports = router