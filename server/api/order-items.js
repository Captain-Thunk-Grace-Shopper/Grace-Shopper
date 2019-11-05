const router = require('express').Router()
const {OrderItem} = require('../db/models')
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const items = await OrderItem.findAll({
      attributes: ['quantity', 'orderId', 'productId']
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})
