import React from 'react'
import {connect} from 'react-redux'
import {getOpenOrder} from '../store/orders'
import CartItem from './cartItem'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getOpenOrder()
  }

  render() {
    const openOrder = this.props.openOrder
    let total = 0
    //if there are no carts
    if (!openOrder.length) {
      return <br />
    }
    return (
      <div className="cart-container">
        <h2 id="cart-header">YOUR CART</h2>
        <hr id="cart-hr" />
        <div id="cart-items">
          {openOrder.map((item, idx) => (
            <div key={item.name}>
              <CartItem idx={idx} item={item} />
              <hr id="cart-item-hr" />
            </div>
          ))}
        </div>
        <div id="cart-total">
          <hr id="cart-hr" />
          {openOrder.map(item => {
            let price = item.price || item['order-item'].price
            let quantity = item.quantity || item['order-item'].quantity
            total += price * quantity
          })}
          <h3 id="subtotal">
            TOTAL<br />
            <span id="total">${Math.floor(total * 100) / 100}</span>
          </h3>
        </div>
        <br />
        <Link to="/checkout">
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('mapping cart state to props', state.orders)
  return {openOrder: state.orders}
}

const mapDispatchToProps = dispatch => {
  return {
    getOpenOrder: () => {
      dispatch(getOpenOrder())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
