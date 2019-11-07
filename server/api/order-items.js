const router = require('express').Router()
const {OrderItem} = require('../db/models')
const {Product} = require('../db/models')
module.exports = router

//find all ORDER ITEMS in an order
// router.get('/:orderId', async (req, res, next) => {
//   try {
//     const items = await OrderItem.findAll()
//     res.json(items)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:orderId', async (req, res, next) => {
  try {
    const items = await OrderItem.findAll({
      where: {
        id: req.params.orderId
      }
    })
    res.json(items)
  } catch (error) {
    next(error)
  }
})
