const router = require('express').Router()
const {Order} = require('../db/models')
const {User} = require('../db/models')
const {OrderItem} = require('../db/models')
const Product = require('./products')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: [{model: OrderItem}]})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/openCart', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {status: 'Created'},
      include: [{model: OrderItem}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
    res.json(order)
  } catch (error) {
    next(error)
  }
})
