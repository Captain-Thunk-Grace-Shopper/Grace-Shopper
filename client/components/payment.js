import React from 'react'
import {closeOpenOrder} from '../store/orders'
import {connect} from 'react-redux'
const initial_state = {
  name: '',
  address: ''
}
class Payment extends React.Component {
  constructor() {
    super()
    this.state = initial_state
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(event) {
    event.preventDefault()
    let state = {
      name: event.target.cardOwner.value,
      address: event.target.billAddress.value
    }
    this.props.closeOpenOrder(state.address, state.name)
    this.props.history.push('/lastpage')
  }
  render() {
    return (
      <main>
        <div>
          <h3>Payment Information:</h3>
          <form onSubmit={this.handleClick}>
            <label>
              Card Owner:<input name="cardOwner" type="text" required />
            </label>
            <label>
              Card Type:{' '}
              <select name="cardType">
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
            </label>
            <label>
              Card Number:<input name="cardNumber" type="number" required />
            </label>
            <label>
              CVV:<input name="cvv" type="number" required />
            </label>
            <label>
              Expiration Date:<input name="expDate" type="date" required />
            </label>
            <label>
              Billing Address:<input name="billAddress" type="text" required />
            </label>
            <br />
            <button type="submit" className="deliver">
              Place Your Order
            </button>
          </form>
        </div>
      </main>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeOpenOrder: (address, name) => dispatch(closeOpenOrder(address, name))
  }
}
export default connect(null, mapDispatchToProps)(Payment)
