const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },
  imgUrl: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.ENUM('Fruit', 'Meat & Poultry', 'Bakery', 'Vegetables'),
    allowNull: false
  }
})

module.exports = Product
