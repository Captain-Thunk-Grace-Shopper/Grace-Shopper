import React from 'react'
import {connect} from 'react-redux'
import {getOpenCart} from '../store/orders'
import CartItem from './cartItem'

class Cart extends React.Component {
  componentDidMount() {
    console.log('cart component mounted')
    this.props.getOpenCart()
  }

  render() {
    const openCart = this.props.openCart[0]
    //if there are no carts
    if (!openCart) {
      return <h1>Start a cart</h1>
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
  return {openCart: state.orders}
}

const mapDispatchToProps = dispatch => {
  console.log('mapping dispatch to props')
  return {
    getOpenCart: () => {
      dispatch(getOpenCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
