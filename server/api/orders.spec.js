/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    const type = 'Created'
    const address = '1234 Main Street'
    const name = 'Cody'

    beforeEach(() => {
      return Order.create({
        type,
        address,
        name
      })
    })

    it('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(name)
      expect(res.body[0].address).to.be.equal(address)
    })
  })
})
