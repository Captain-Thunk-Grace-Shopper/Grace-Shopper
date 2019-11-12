/* eslint-disable complexity */
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

//GET : find ALL ORDER ITEMS in one order
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
    //guest cart
    if (!req.session.passport || !req.session.passport.user) {
      let cart = req.session.order
      // //check if item already exists
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === req.body.name) {
          res.redirect('/update')
        }
      }
      //if item is not in cart
      cart.push({
        cartItemId:
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15),
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
      })
      res.sendStatus(201)
    } else {
      //user cart
      const userId = req.session.passport.user
      let openCart
      //find open cart, create one if not found ---> maybe can redirect instead?
      openCart = await Order.findOpenCart(userId)
      if (!openCart) {
        openCart = await Order.create({userId})
      }
      // check if the order-item exists in the open cart --> if found redirect to put route
      const allProducts = await openCart.getProducts()
      for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].dataValues.name === req.body.name) {
          res.redirect('/update')
        }
      }
      // if item is not in cart, create item w/ right productId & orderId
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
  } catch (error) {
    next(error)
  }
})

//PUT : update the order-item quantity (use case: if order-item already exists,
// aka from -/+ buttons in cart view)

router.put('/:itemId', async (req, res, next) => {
  try {
    if (!req.session.passport || !req.session.passport.user) {
      let cart = req.session.order
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].cartItemId === req.params.itemId) {
          cart[i].quantity = req.body.quantity
        }
      }
      res.send('Item updated')
    } else {
      let order = await OrderItem.findOne({where: {id: req.params.itemId}})
      await order.update({quantity: req.body.quantity})
      res.json(order)
    }
  } catch (error) {
    next(error)
  }
})

//DELETE: remove order-item

router.delete('/:itemId', async (req, res, next) => {
  try {
    if (!req.session.passport || !req.session.passport.user) {
      let cart = req.session.order
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].cartItemId === req.params.itemId) {
          cart = cart.splice(i, 1)
        }
      }
    } else {
      await OrderItem.destroy({where: {id: req.params.itemId}})
    }
    res.status(204).send('Item deleted from cart!')
  } catch (error) {
    next(error)
  }
})
