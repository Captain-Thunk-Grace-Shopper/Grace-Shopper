const router = require('express').Router()
const {Order} = require('../db/models')
const {User} = require('../db/models')
const {OrderItem} = require('../db/models')
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
