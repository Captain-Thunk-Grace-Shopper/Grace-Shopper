import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/products'
import {addToOpenOrder} from '../store/orders'
import Products from './Products'
import Cart from './cart'

class Home extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    return (
      <div>
        <h2>SuperMarket</h2>
        <div id="groceries-container">
          <ul className="grocery-list">
            {this.props.products.map(product => (
              <li key={product.id} className="grocery-item">
                <Products products={product} addToCart={this.props.addToCart} />
              </li>
            ))}
          </ul>
        </div>
        <Cart />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('mapping products to props', state.products)
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts()),
  addToCart: (productName, quantity, price) =>
    dispatch(addToOpenOrder(productName, quantity, price))
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)
