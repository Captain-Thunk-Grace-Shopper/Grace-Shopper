const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const User = db.model('user')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('classMethods', () => {
    describe('findOpenCart', () => {
      let user
      let userId
      beforeEach(async () => {
        user = await User.create({
          email: 'testing@test.com',
          password: 'test'
        })
        userId = user.dataValues.id
      })

      it('returns null if no open cart exists', async () => {
        const openCart = await Order.findOpenCart(userId)
        expect(openCart).to.be.equal(null)
      })

      it('returns an order with status `created` for correct user', async () => {
        await Order.create({userId})
        const openCart = await Order.findOpenCart(userId)
        expect(openCart.dataValues.status).to.be.equal('Created')
        expect(openCart.dataValues.userId).to.be.equal(userId)
      })
    }) // end describe('findOpenCart')
  }) // end describe('classMethods')
}) // end describe('Order model')
