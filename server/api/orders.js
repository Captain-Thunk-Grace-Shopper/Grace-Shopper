const router = require('express').Router()
const {Order} = require('../db/models')
const {User} = require('../db/models')
const {OrderItem} = require('../db/models')
const {Product} = require('../db/models')
// const Product = require('./products')
module.exports = router

//SHOWS ~ALL~ ORDERS FROM ALL CUSTOMERS; add in validation for Admin only?
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: [{model: OrderItem}]})
    res.json(orders)
  } catch (error) {
    next(error)
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

//GET ORDERS FOR SPECIFIC USER OR GUEST
router.get('/user', async (req, res, next) => {
  try {
    if (req.session.passport) {
      const orders = await Order.findAll({
        where: {userId: req.session.passport.user},
        include: [{model: OrderItem}]
      })
      res.json(orders)
    } else {
      // res.send(req.session.order)
      res.send(req.session)
    }
  } catch (err) {
    next(err)
  }
})
