const router = require('express').Router()
const {OrderItem} = require('../db/models')
const {Product} = require('../db/models')
module.exports = router

//find ALL ITEMS EVER ORDERED - probably not necessary
router.get('/', async (req, res, next) => {
  try {
    const items = await OrderItem.findAll()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

//find ALL ORDER ITEMS in one order
router.get('/:orderId', async (req, res, next) => {
  try {
    const items = await OrderItem.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.json(items)
  } catch (error) {
    next(error)
  }
})
