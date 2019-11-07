const router = require('express').Router()
const {Order} = require('../db/models')
const {User} = require('../db/models')
const {OrderItem} = require('../db/models')
const {Product} = require('../db/models')
// const Product = require('./products')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: [{model: OrderItem}]})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: OrderItem}]
    })

    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/openOrderProducts', async (req, res, next) => {
  //CHECK SESSIONS
  //if guest --> res.send()
  //if user:
  //check userid --> set userId below and execute following try/catch:
  const userId = 1
  try {
    //grab user's open cart
    const orders = await Order.findOne({
      where: {status: 'Created', userId: userId}
    })
    //get open cart's items
    const allProducts = await orders.getProducts()
    res.json(allProducts)
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
