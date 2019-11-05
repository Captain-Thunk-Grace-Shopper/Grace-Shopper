const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created', 'Submitted', 'Complete'),
    allowNull: false,
    defaultValue: 'Created'
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Order
