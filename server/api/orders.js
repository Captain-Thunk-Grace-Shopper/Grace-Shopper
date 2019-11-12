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

//get open cart
router.get('/openOrderProducts', async (req, res, next) => {
  try {
    //guest cart
    if (!req.session.passport || !req.session.passport.user) {
      res.send(req.session.order)
    } else {
      //user cart
      const userId = req.session.passport.user
      const orders = await Order.findOpenCart(userId)
      const allProducts = await orders.getProducts()
      res.json(allProducts)
    }
  } catch (err) {
    next(err)
  }
})

//get past orders from logged in user
router.get('/pastOrders', async (req, res, next) => {
  try {
    //user cart
    const pastOrders = []
    const userId = req.session.passport.user
    const orders = await Order.findClosedCart(userId)
    for (let i = 0; i < orders.length; i++) {
      pastOrders.push(await orders[i].getProducts())
    }
    res.json(pastOrders)
  } catch (err) {
    next(err)
  }
})

//create new open cart (if no open carts exist)
router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
    res.json(order)
  } catch (error) {
    next(error)
  }
})

//PUT: update open cart status on checkout
