import React from 'react'
import {connect} from 'react-redux'
import {getOpenOrder} from '../store/orders'
import CartItem from './cartItem'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getOpenOrder()
  }

  render() {
    const openOrder = this.props.openOrder
    let total = 0
    //if there are no carts
    if (!openOrder.length) {
      return <h1>Add an item to start a cart</h1>
    }
    return (
      <div className="cart-container">
        <h1 id="cart-header">Your cart:</h1>
        <div id="cart-items">
          {openOrder.map((item, idx) => (
            <CartItem idx={idx} key={item.name} item={item} />
          ))}
        </div>
        <div id="cart-total">
          {openOrder.map(item => {
            let price = item.price || item['order-item'].price
            let quantity = item.quantity || item['order-item'].quantity
            total += price * quantity
          })}
          Total: $ {Math.floor(total * 100) / 100}

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
