'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'wesam@email.com', password: '123'}),
    User.create({
      email: 'kat@email.com',
      password: '123',
      name: 'kat',
      address: '5 Hanover Sq'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Bananas',
      description: 'Yellow & Yummy',
      price: 1.0,
      inventory: 100,
      category: 'Fruit',
      imgUrl:
        'https://assets.shop.loblaws.ca/products_jpeg/20175355001/en/20175355001_lrg_1_@1x.jpg'
    }),
    Product.create({
      name: 'Chicken',
      description: 'Fresh thigh',
      price: 5.0,
      inventory: 100,
      category: 'Meat & Poultry',
      imgUrl:
        'https://thecookful.com/wp-content/uploads/2018/09/chicken-thighs-instant-pot-feature-1392x780.jpg'
    }),
    Product.create({
      name: 'Avacados',
      description: 'Bright & Green',
      price: 7.0,
      inventory: 200,
      category: 'Vegetables',
      imgUrl:
        'https://media.self.com/photos/5b43712e4d0c3c282a8878d1/4:3/w_728,c_limit/avocado.jpg'
    }),
    Product.create({
      name: 'Cookies',
      description: 'Made by Granny',
      price: 5.0,
      inventory: 50,
      category: 'Bakery',
      imgUrl:
        'https://joyfoodsunshine.com/wp-content/uploads/2016/01/best-chocolate-chip-cookies-recipe-ever-no-chilling-1-500x500.jpg'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
