const router = require('express').Router()
const {Order} = require('../db/models')
const {User, OrderItem, Product} = require('../db/models')
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

//PUT: update open cart status on checkout for user
//or post guest cart
router.put('/', async (req, res, next) => {
  try {
    //guest order
    if (!req.session.passport || !req.session.passport.user) {
      const order = await Order.create({
        status: 'Submitted',
        address: req.body.address,
        name: req.body.name
      })
      res.json(order)
    } else {
      //user order update
      const existOrder = await OrderItem.findOne({
        where: {id: req.params.orderId}
      })
      existOrder.status = 'Submitted'
      res.json(existOrder)
    }
  } catch (error) {
    next(error)
  }
})
