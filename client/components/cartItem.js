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

  componentDidMount() {}

  plus() {
    this.props.update(
      this.props.item.cartItemId || this.props.item['order-item'].id,
      this.state.quantity + 1
    )
    this.setState(previousState => ({quantity: previousState.quantity + 1}))
  }

  minus() {
    if (this.state.quantity > 0) {
      this.props.update(
        this.props.item.cartItemId || this.props.item['order-item'].id,
        this.state.quantity - 1
      )
      this.setState(previousState => ({quantity: previousState.quantity - 1}))
    }
  }

  render() {
    const cartItem = this.props.item
    const num = this.props.idx + 1
    const name = cartItem.name
    const itemId =
      this.props.item.cartItemId || this.props.item['order-item'].id
    const quantity = cartItem.quantity || cartItem['order-item'].quantity
    //rounds price to nearest 10th
    const price =
      Math.floor(cartItem.price * quantity * 100) / 100 ||
      Math.floor(cartItem['order-item'.price] * quantity * 100) / 100

    return (
      <div className="cart-item">
        {name}, Price: $ {price}
        <br />
        <div id="cart-quantity">
          Qty:
          <input
            type="button"
            value="-"
            id="plus-minus"
            className="button-minus"
            onClick={this.minus}
          />
          <input
            type="number"
            name="quantity"
            id="quantity-field"
            value={this.state.quantity}
            onChange={evt => this.setState({quantity: evt.target.value})}
          />
          <input
            type="button"
            value="+"
            id="plus-minus"
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
            <i className="fas fa-trash-alt" />
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  console.log('mapping dispatch to props')
  return {
    delete: id => dispatch(removeFromOpenOrder(id)),
    update: (id, quantity) => {
      console.log('in update')
      dispatch(updateOpenOrder(id, quantity))
    }
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
