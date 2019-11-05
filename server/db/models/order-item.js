const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('order-item', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderItem
