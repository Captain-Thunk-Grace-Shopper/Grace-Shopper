import React from 'react'
import {connect} from 'react-redux'
import {removeFromOpenOrder, updateOpenOrder} from '../store/orders'

class CartItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity:
        this.props.item.quantity || this.props.item['order-item'].quantity
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

  handleChange(evt, itemId) {
    this.setState({quantity: evt.target.value})
    this.props.update(itemId, this.state.quantity)
  }

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
          Item {num}: {name}, Price: $ {price}
          <br />
          Quantity:
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
            onChange={evt => {
              this.update(itemId, evt.target.value)
              // this.setState({quantity: evt.target.value})
            }}
          />
          <input
            type="button"
            value="+"
            className="button-plus"
            onClick={this.plus}
          />
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
    delete: id => dispatch(removeFromOpenOrder(id)),
    update: (id, quantity) => dispatch(updateOpenOrder(id, quantity))
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
