import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/products'
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
                <Products products={product} />
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
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(getProducts())
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)
