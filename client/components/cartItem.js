import React from 'react'
import {connect} from 'react-redux'
import {removeFromOpenOrder} from '../store/orders'

class CartItem extends React.Component {
  render() {
    const cartItem = this.props.item
    const num = this.props.idx + 1
    const name = cartItem.name
    const itemId = this.props.item.guestId || this.props.item['order-item'].id
    const quantity = cartItem.quantity || cartItem['order-item'].quantity
    const price =
      Math.floor(cartItem.price * quantity * 100) / 100 ||
      Math.floor(cartItem['order-item'.price] * quantity * 100) / 100

    return (
      <main>
        <div>
          Item {num}: {name}, Quantity: {quantity}, Price: $ {price}
          <button
            type="button"
            id="delete-button"
            onClick={() => {
              this.props.delete(itemId)
            }}
          >
            Delete
          </button>
        </div>
      </main>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delete: id => dispatch(removeFromOpenOrder(id))
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
