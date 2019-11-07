const router = require('express').Router()
const {Order} = require('../db/models')
const {User} = require('../db/models')
const {OrderItem} = require('../db/models')
const {Product} = require('./products')
module.exports = router

// //SHOWS ~ALL~ ORDERS FROM ALL CUSTOMERS; add in validation for Admin only?
// router.get('/', async (req, res, next) => {
//   try {
//     const orders = await Order.findAll({include: [{model: Product, as: 'products', required: false, attributes: ['name'], through: {model: OrderItem, as: 'orderItems', attributes: ['quantity']}}]})
//     res.json(orders)
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/', async (req, res, next) => {
  try {
    const items = await Order.findAll({
      include: [
        {
          model: Product
          // as: 'products',
          // required: false,
          // attributes: ['id', 'name'],
          // through: {
          //   model: OrderItem,
          //   as: 'productOrders',
          //   attributes: ['productId'],
          // }
        }
      ]
    })

    res.send(items)
  } catch (error) {
    next(error)
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

//GET ORDERS FOR SPECIFIC USER OR GUEST
router.get('/:userId', async (req, res, next) => {
  try {
    if (req.session.passport) {
      const orders = await Order.findAll({
        where: {userId: req.params.userId},
        include: [{model: Product}]
      })
      res.json(orders)
    } else {
      res.send(req.session.order)
    }
  } catch (err) {
    next(err)
  }
})
