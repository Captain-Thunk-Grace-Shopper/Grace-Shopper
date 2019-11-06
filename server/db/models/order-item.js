const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('order-item', {
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = OrderItem
