import React from 'react'
import {connect} from 'react-redux'
import getCartThunkCreator from '../store/cart'
import CartItem from './cartItem'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }
  render() {
    return this.props.cart.map(item => {
      return <CartItem item={item} key={item.id} />
    })
  }
}

const mapStateToProps = state => {
  return {cart: state.cart}
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => {
      dispatch(getCartThunkCreator())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
