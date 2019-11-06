import React from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'
import CartItem from './cartItem'

class Cart extends React.Component {
  componentDidMount() {
    console.log('cart component mounted')
    this.props.getOrders()
  }

  render() {
    //if there are no carts
    if (!Array.isArray(this.props.orders)) {
      return <h1>Start a cart</h1>
    }
    //otherwise find the most recent open cart (aka created cart)
    let openCart = {}
    this.props.orders.forEach(order => {
      if (order.status === 'Created') {
        openCart = order
      }
    })
    //if there are no open carts
    if (!openCart.name) {
      return <h1>Start a cart!</h1>
    }
    console.log('openCart:', openCart['order-items'])
    return (
      <main>
        <div>
          <h1>This is your cart</h1>
          {openCart['order-items'].map((item, idx) => (
            <CartItem
              idx={idx}
              key={[item.orderId, item.productId]}
              item={item}
            />
          ))}
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => {
  console.log('mapping state to props', state.orders)
  return {orders: state.orders}
}

const mapDispatchToProps = dispatch => {
  console.log('mapping dispatch to props')
  return {
    getOrders: () => {
      dispatch(getOrders())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
