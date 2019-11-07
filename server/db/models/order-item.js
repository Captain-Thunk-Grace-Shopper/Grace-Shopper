const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('order-item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = OrderItem
