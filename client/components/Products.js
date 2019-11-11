import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Products extends Component {
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

  render() {
    const productName = this.props.products.name
    const productId = this.props.products.id
    const quantity = this.state.quantity
    const price = this.props.products.price
    return (
      <div>
        <Link to={`/products/${productId}`}>
          <div id="grocery-list-image-container">
            <img src={this.props.products.imgUrl} id="grocery-list-image" />
          </div>
          <div id="grocery-list-name">
            <p>
              <b>{productName}</b>
            </p>
          </div>
        </Link>
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
            this.props.addToCart(productName, quantity, price)
          }}
        >
          Add to cart
        </button>
      </div>
    )
  }
}
export default Products
