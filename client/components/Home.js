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
      <main>
        <div>
          <h2>SuperMarket</h2>
          {this.props.products.map((products, idx) => (
            <Products key={idx} products={products} />
          ))}
        </div>
        <div>
          <Cart />
        </div>
      </main>
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
