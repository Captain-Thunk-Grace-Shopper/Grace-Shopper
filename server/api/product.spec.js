/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const productName = 'bananas'
    const productPrice = 10.0
    const productCategory = 'Fruit'

    beforeEach(() => {
      return Product.create({
        name: productName,
        price: productPrice,
        category: productCategory
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(productName)
      expect(res.body[0].price).to.be.equal(productPrice.toString())
      expect(res.body[0].category).to.be.equal(productCategory)
    })

    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(productName)
      expect(res.body.price).to.be.equal(productPrice.toString())
      expect(res.body.category).to.be.equal(productCategory)
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
