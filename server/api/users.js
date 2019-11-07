const router = require('express').Router()
const {User} = require('../db/models')
const {Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//FINDS USER ORDERS BASED ON USER ID
router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {userId: req.params.userId}
    })
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  console.log('hello')
  try {
    const address = await User.create(req.body)

    res.status(201).json(address)
  } catch (error) {
    next(error)
  }
})
