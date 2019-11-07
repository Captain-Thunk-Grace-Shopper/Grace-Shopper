'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Order} = require('../server/db/models')
const {OrderItem} = require('../server/db/models')

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
    }),
    Product.create({
      name: 'Watermelon',
      description: 'Seasonal',
      price: 3.99,
      inventory: 50,
      category: 'Fruit',
      imgUrl:
        'https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/watermelon.jpg?itok=6EdNOdUo'
    }),
    Product.create({
      name: 'Broccoli',
      description: 'Fresh',
      price: 2.99,
      inventory: 50,
      category: 'Vegetables',
      imgUrl:
        'https://www.health.harvard.edu/media/content/images/p7_Broccoli_HH1812_gi905351392.jpg'
    }),
    Product.create({
      name: 'Eggs',
      description: 'Organic and cage free',
      price: 1.29,
      inventory: 50,
      category: 'Meat & Poultry',
      imgUrl:
        'https://twohealthykitchens.com/wp-content/uploads/2015/10/THK-Egg-Facts51.jpg'
    }),
    Product.create({
      name: 'Pinot Noir',
      description: 'Cloudline Oregon',
      price: 19.99,
      inventory: 10,
      category: 'Beer & Wine',
      imgUrl:
        'https://www.haskells.com/media/catalog/product/cache/1/image/816x1200/040ec09b1e35df139433887a97daa66f/5/1/510056_0_1_1.jpg'
    }),
    Product.create({
      name: 'Ice Tea',
      description: 'Unsweetened, Glass Bottle',
      price: 2.99,
      inventory: 50,
      category: 'Beverages',
      imgUrl:
        'https://www.german-design-award.com/fileadmin/GDA/gallery/2016/99023/productimage_large.jpg'
    }),
    Product.create({
      name: 'Shrimp',
      description: 'All-Natural Wild Domestic shrimp',
      price: 24.99,
      inventory: 50,
      category: 'SeaFood',
      imgUrl:
        'https://static.wixstatic.com/media/0ff79f_a8d231df61e445a794cf29110d58d159.jpg/v1/fill/w_532,h_532,al_c,lg_1,q_85/0ff79f_a8d231df61e445a794cf29110d58d159.jpg'
    })
  ])

  const orders = await Promise.all([
    Order.create({
      status: 'Created',
      address: '5 Hanover Square',
      name: 'Wesam'
    }),
    Order.create({
      status: 'Submitted',
      address: '150 Broadway',
      name: 'Katherine'
    }),
    Order.create({
      status: 'Complete',
      address: '200 Broad st',
      name: 'Tani'
    }),
    Order.create({
      status: 'Created',
      address: '100 Hamilton pkway',
      name: 'Cody'
    }),
    Order.create({
      status: 'Submitted',
      address: '345 Beaver st',
      name: 'Ada'
    }),
    Order.create({
      status: 'Complete',
      address: '876 Water st',
      name: 'Alan'
    })
  ])

  const orderItems = await Promise.all([
    OrderItem.create({
      quantity: 20,
      orderId: 1,
      productId: 3
    }),
    OrderItem.create({
      quantity: 4,
      orderId: 1,
      productId: 1
    }),
    OrderItem.create({
      quantity: 2,
      orderId: 1,
      productId: 4
    }),
    OrderItem.create({
      quantity: 20,
      orderId: 2,
      productId: 3
    }),
    OrderItem.create({
      quantity: 20,
      orderId: 3,
      productId: 3
    }),
    OrderItem.create({
      quantity: 20,
      orderId: 4,
      productId: 3
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderItems.length} order items`)
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
