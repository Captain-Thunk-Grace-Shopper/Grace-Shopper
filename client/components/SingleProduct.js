import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'
import {addToOpenOrder} from '../store/orders'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.minus = this.minus.bind(this)
    this.plus = this.plus.bind(this)
  }

  plus() {
    this.setState(previousState => ({quantity: previousState.quantity + 1}))
  }

  minus() {
    if (this.state.quantity > 0) {
      this.setState(previousState => ({quantity: previousState.quantity - 1}))
    }
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.paramId)
  }
  addToCart() {}
  render() {
    const product = this.props.product
    return (
      <main>
        <div>
          <h2>{product.name}</h2>
          <img height="200px" width="200px" src={product.imgUrl} />
          <h3>Description:</h3>
          <p>{product.description}</p>
          <h4>Price:{product.price}</h4>
          <div id="quantity-container">
            <input
              type="button"
              value="-"
              className="button-minus"
              onClick={this.minus}
            />
            <input
              type="number"
              name="quantity"
              value={this.state.quantity}
              onChange={evt => this.setState({quantity: evt.target.value})}
            />
            <input
              type="button"
              value="+"
              className="button-plus"
              onClick={this.plus}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              this.props.addToCart(
                product.name,
                this.state.quantity,
                product.price
              )
            }}
          >
            Add to cart
          </button>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    paramId: ownProps.match.params.productId,
    product: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    addToCart: (productName, quantity, price) =>
      dispatch(addToOpenOrder(productName, quantity, price))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
