'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'theBest',
      address: '1 Hanover',
      zip: '10004',
      phoneNumber: '12345678',
      country: 'United States',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Ghost',
      lastName: 'Buster',
      address: '100 Broad st',
      zip: '10104',
      phoneNumber: '098765432',
      country: 'United States',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Wesam',
      lastName: 'AbdelZaher',
      address: '200 Broadway',
      zip: '10011',
      phoneNumber: '1987658',
      country: 'United States',
      email: 'wesam@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Katherine',
      lastName: 'Pryszlak',
      address: '456 Bleecker st',
      zip: '12204',
      phoneNumber: '122345678',
      country: 'United States',
      email: 'kat@email.com',
      password: '123'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Bananas',
      description:
        "The banana is an anytime, year-round snack. We like them fully yellow with just a dusting of brown freckles. But super-ripe, meltingly sweet bananas and firmer greenish ones have their fans too. Slice them onto cereal or pancakes, fold into fruit salad, blend into smoothies, and bake into muffins. Heat brings out bananas' creamy sweetness. Try baking, broiling, or sautéing them with butter and sugar for a luscious dessert.",
      price: 1.0,
      inventory: 100,
      category: 'Fruit',
      imgUrl:
        'https://assets.shop.loblaws.ca/products_jpeg/20175355001/en/20175355001_lrg_1_@1x.jpg'
    }),
    Product.create({
      name: 'Red Apples',
      description:
        "These apples strike a perfect balance between tangy and sweet. We think of it as a late-season version of the tried-and-true McIntosh  only crisper and with more flavor. The skin that protects it from early frosts is a little tough, so we like to eat it peeled. It is perfect for pies because it doesn't brown when you slice it  the color stays nice and creamy.",
      price: 2.99,
      inventory: 100,
      category: 'Fruit',
      imgUrl:
        'http://almazagrocerybz.com/wp-content/uploads/2018/02/Fresh-Organic-Apple-1pc-600x600.jpg'
    }),
    Product.create({
      name: 'Watermelon',
      description:
        'Using the best seed, the best growers and a passion for perfection, they grow produce that not only looks good but tastes good. These watermelons are sweet, conveniently sized and always seedless, making them ideal for snacking on the go.',
      price: 3.99,
      inventory: 50,
      category: 'Fruit',
      imgUrl:
        'https://snaped.fns.usda.gov/sites/default/files/styles/crop_ratio_7_5/public/seasonal-produce/2018-05/watermelon.jpg?itok=6EdNOdUo'
    }),
    Product.create({
      name: 'Navel Orange',
      description:
        'Extra-big, beautiful, seedless, very low in acid and filled with mild, sweet flesh. These beauties are supremely simple to peel and section. Bursting with freshly picked juiciness, this is the perfect orange to serve to kids. We also like to toss sections into fruit salad.',
      price: 1.59,
      inventory: 50,
      category: 'Fruit',
      imgUrl: 'http://www.specialtyproduce.com/sppics/8521.png'
    }),
    Product.create({
      name: 'Grapes',
      description:
        "Mother Nature's ruby-colored candy. Seedless, juicy, and sweet. An easy addition to green salads with nuts and crunchy vegetables. Grapes contain the antioxidant resveratrol and immune-boosting phytochemicals.",
      price: 2.99,
      inventory: 50,
      category: 'Fruit',
      imgUrl:
        'https://producegeek.com/wp-content/uploads/2017/05/red-flame-seedless-grapes-02-940x626.jpg'
    }),
    Product.create({
      name: 'Strawberries',
      description:
        'These strawberries are consistently the best, sweetest, juiciest strawberries available. This size is the best selling, as it is both convenient for completing a cherished family recipes and for preparing a quick snack straight from the fridge.',
      price: 4.99,
      inventory: 50,
      category: 'Fruit',
      imgUrl: 'https://www.aces.edu/wp-content/uploads/2019/04/strawberry-.jpg'
    }),
    Product.create({
      name: 'Blueberries',
      description:
        'Smooth-skinned, perfect little globes of fresh, juicy flavor, mostly sweet and a little tart. These plump blueberries have it all: longevity, health benefits, and versatility. Sprinkle them with cream and sugar, scatter them over ice cream, or put three in your martini.',
      price: 4.99,
      inventory: 50,
      category: 'Fruit',
      imgUrl:
        'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
    }),
    Product.create({
      name: 'Avocados',
      description:
        "With its irresistibly buttery flavor, the Hass sets the avocado standard. It also wins the popularity contest, making up 75% of the American crop. A luscious slice of Hass avocado really pumps up the taste of burritos, burgers, salads, and sushi rolls. Plan ahead! Our avocados arrive firm. They'll ripen in 3-5 days at room temperature—just like a banana—or speed up the process by storing them in a paper bag. To slow ripening, store in the fridge. When your avocados yield to gentle pressure, they're ready.",
      price: 7.0,
      inventory: 200,
      category: 'Vegetables',
      imgUrl:
        'https://media.self.com/photos/5b43712e4d0c3c282a8878d1/4:3/w_728,c_limit/avocado.jpg'
    }),

    Product.create({
      name: 'Broccoli',
      description:
        "With its cabbage-like flavor and satisfying crunch, we think of broccoli as one of the ultimate vegetables. It's nutritious, low in calories, available year-round and hearty. Steam it, stir-fry it, sauté it, bake it in casseroles, purée it in soups or dunk it raw in dressing or hummus.",
      price: 2.99,
      inventory: 50,
      category: 'Vegetables',
      imgUrl:
        'https://www.health.harvard.edu/media/content/images/p7_Broccoli_HH1812_gi905351392.jpg'
    }),
    Product.create({
      name: 'Spinach',
      description:
        'Fresh spinach has a clean, crisp taste with a light sharpness that fits beautifully in rich dishes made with eggs and cheeses. Use it in soups, omelets, salads and frittatas. Sauté it. Steam it. Braise it. Spinach shrinks dramatically when you cook it. A large panful reduces to a small lump.',
      price: 2.99,
      inventory: 50,
      category: 'Vegetables',
      imgUrl:
        'https://www.seedsofindia.com/shop/images/Spinach-Sagar65-531_th.jpg'
    }),
    Product.create({
      name: 'Carrots',
      description:
        'Colorful, crunchy and very sweet! These multi-colored carrots are lovely to look at and even lovelier to snack on. We suggest enjoying them raw, either as part of a festive crudité platter or shredded in a salad. If you must cook them, do it quickly — their colors fade the longer you cook them.',
      price: 2.99,
      inventory: 50,
      category: 'Vegetables',
      imgUrl:
        'https://www.tasteofhome.com/wp-content/uploads/2019/01/carrots-shutterstock_789443206-800x450.jpg'
    }),
    Product.create({
      name: 'Lettuce',
      description:
        'Romaine is sweet and crunchy at heart. If you find yourself ripping through a whole head of romaine to get to the small, mild, and crisp leaves in the center, let us do the work for you. Romaine hearts deliver the soul of the lettuce without all the prep work.',
      price: 5.99,
      inventory: 50,
      category: 'Vegetables',
      imgUrl:
        'https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_b149f8f0-0d2e-4d83-9c2e-4230db09130b.jpg'
    }),
    Product.create({
      name: 'Eggplant',
      description:
        "Organice, lush and creamy, with a mild, earthy flavor, eggplant has the most velvety texture in the vegetable family. It's high in healthy fiber. We love it sliced, brushed with olive oil and salt, and grilled or roasted. We also love it breaded, fried, and smothered in fried onions. Come to think of it, we just plain love it.",
      price: 3.99,
      inventory: 50,
      category: 'Vegetables',
      imgUrl:
        'https://cdn-prod.medicalnewstoday.com/content/images/articles/279/279359/eggplants.jpg'
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
      name: 'Cupcakes',
      description:
        "These cupcakes are here to party! Each pack includes two chocolate and two vanilla cupcakes, all spread thick with frosting and topped with rainbow-colored sprinkles. They'll definitely bring the cheer when you've got a birthday or other special occasion to celebrate.",
      price: 6.99,
      inventory: 50,
      category: 'Bakery',
      imgUrl:
        'https://www.handletheheat.com/wp-content/uploads/2015/02/Chocolate-Raspberry-Cupcakes-square.jpg'
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
      name: 'Vegan Pumpkin Pie',
      description:
        "We take our own secret blend of traditional spices and combine them with sweet and spicy pumpkin, then bake it all into our flaky crust. The result is a rich, delicately textured pie boasting a comforting nutmeg flavor that you won't believe is dairy free. Although we think it's great just the way it is, a scoop of non-dairy ice cream adds the perfect finishing touch.",
      price: 14.99,
      inventory: 50,
      category: 'Bakery',
      imgUrl:
        'http://images.media-allrecipes.com/userphotos/960x960/4128993.jpg'
    }),
    Product.create({
      name: 'Cloudline Oregon Pinot Noir',
      description:
        'Relying exclusively on the best vineyards in Oregon, Cloudline is a true representation of Pinot Noir — incredibly rich, charming, harmonious and complete.',
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
      name: 'Domaine Sautereau Sancerre',
      description:
        'Sautereau Sancerre is intense and lively with a good varietal profile leading to notes of boxwood, rhubarb, melon, and fruity aromas of pear and mango. Supple in the first instance, the vine shows good volume in the middle of the mouth with fruity and floral accents. The aromatics of mirabelle plum linger long. Enjoy with salads, goat cheese, oysters, smoked salmon, and other seafood dishes.',
      price: 24.99,
      inventory: 10,
      category: 'Beer & Wine',
      imgUrl:
        'https://www.wineconnection.co.th/media/catalog/product/cache/1/thumbnail/530x650/9df78eab33525d08d6e5fb8d27136e95/l/o/lo25.jpg'
    }),
    Product.create({
      name: 'Tropicana Pure Premium Orange Juice',
      description:
        'Tropicana Pure Premium Calcium + Vitamin D is a delicious, convenient way to get more calcium and vitamin D in your diet! It is 100% pure orange juice with added Calcium and Vitamin D. (from Tropicana)',
      price: 6.59,
      inventory: 50,
      category: 'Beverages',
      imgUrl:
        'https://i5.walmartimages.com/asr/62cec667-2e6d-4f3f-8c07-dd70266108de_1.6b5524bcf11961eb1a54f27ed72ee204.jpeg'
    }),
    Product.create({
      name: 'All-Natural Wild Domestic shrimp',
      description:
        "Sweet and flavorful — jumbo shrimp aren't just an oxymoron; they're the perfect size for skewers, scampi, or stew. They're big enough to stand up to curry, Creole seasonings, and other spicy preparations. These shrimp are peeled, deveined, and ready to cook; you can add them directly to stews, soups, sauces or risottos. Boil, steam or pan-fry them only until they're just opaque.",
      price: 24.99,
      inventory: 50,
      category: 'SeaFood',
      imgUrl:
        'https://static.wixstatic.com/media/0ff79f_a8d231df61e445a794cf29110d58d159.jpg/v1/fill/w_532,h_532,al_c,lg_1,q_85/0ff79f_a8d231df61e445a794cf29110d58d159.jpg'
    }),
    Product.create({
      name: 'Organic Farm-Raised Salmon Fillet',
      description:
        'This special organic salmon comes to us fresh (not frozen!) from the cold, fast currents of a certified organic seafarm located in the confluence of the North Sea and the Atlantic Ocean. The beautiful orange-red color is closer to wild salmon than other farmed fish. These salmon are hand-fed an entirely natural and organic diet with no synthetic colorants  the flesh is firm and the flavor is mild.',
      price: 21.99,
      inventory: 50,
      category: 'SeaFood',
      imgUrl:
        'https://static01.nyt.com/images/2016/04/13/dining/13PAIRING/13PAIRING-articleLarge.jpg'
    }),
    Product.create({
      name: 'Chicken',
      description:
        'Our garlic and herb seasoned organic whole chicken has been butterflied, so it cooks fast, stays juicy, and browns evenly in a hot oven or on your grill.',
      price: 5.0,
      inventory: 100,
      category: 'Meat & Poultry',
      imgUrl:
        'https://images-gmi-pmc.edge-generalmills.com/7ed1e04a-7ac6-4ca2-aa74-6c0938069062.jpg'
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

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
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
