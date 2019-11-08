const router = require('express').Router()
const {OrderItem} = require('../db/models')
const {Order, Product} = require('../db/models')

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

//POST : create order-item for open cart
router.post('/', async (req, res, next) => {
  try {
    if (req.session.passport) {
      const userId = req.session.passport.user
      const openCart = await Order.findOpenCart(userId)
      // check if the order-item exists in the open cart
      const allProducts = await openCart.getProducts()
      for (let i = 0; i < allProducts; i++) {
        if (allProducts[i].name === req.body.name) {
          res.redirect('/update')
        } else {
          const product = await Product.findOne({
            where: {name: req.body.name}
          })
          const newItem = await OrderItem.create({
            quantity: req.body.quantity,
            productId: product.id,
            price: req.body.price,
            orderId: openCart.id
          })
          res.status(201).json(newItem)
        }
      }
    }
  } catch (error) {
    next(error)
  }
})

//PUT : update the order-item quantity
