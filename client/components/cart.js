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
      return <h1>Add an item to start a cart</h1>
    }
    return (
      <main>
        <div>
          <h1>Your cart:</h1>
          {openOrder.map((item, idx) => (
            <CartItem idx={idx} key={item.name} item={item} />
          ))}
          {openOrder.map(item => {
            let price = item.price || item['order-item'].price
            let quantity = item.quantity || item['order-item'].quantity
            total += price * quantity
          })}
          Total: {total}
          <br />
          <Link to="/checkout">
            <button type="button" className="checkout-button">
              Checkout
            </button>
          </Link>
        </div>
      </main>
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
