import React from 'react'
import {connect} from 'react-redux'
import {addAddress} from '../store/user'

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  zip: 0,
  country: '',
  phoneNumber: 0,
  instructions: ''
}
class Checkout extends React.Component {
  constructor() {
    super()
    this.state = INITIAL_STATE
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    let state = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      address: event.target.address.value,
      zip: event.target.zip.value,
      country: event.target.country.value,
      phoneNumber: event.target.phoneNumber.value,
      instructions: event.target.instructions.value
    }
    this.props.addAddress(state)
    this.props.history.push('/payment')
  }
  render() {
    return (
      <main>
        <div>
          <h3>Add Shipping Address </h3>
          <form onSubmit={this.handleClick}>
            <label>
              First Name :
              <input name="firstName" type="text" required />
            </label>
            <label>
              Last Name :
              <input name="lastName" type="text" required />
            </label>
            <label>
              <label>
                Email :
                <input name="email" type="text" required />
              </label>
              <label />
              Address :
              <input name="address" type="text" required />
            </label>
            <label>
              ZIP :
              <input name="zip" type="number" required />
            </label>
            <label>
              Country :
              <select name="country">
                <option value="United States">United States</option>
                <option value="Austrlia">Australia</option>
                <option value="UK">UK</option>
                <option value="Japan">Japan</option>
                <option value="Japan">China</option>
              </select>
            </label>
            <label>
              Phone Number:
              <input name="phoneNumber" type="number" />
            </label>
            <h4>Add delivery instructions(optional)</h4>
            <label>
              Do we need additional instructions to find this address?
            </label>
            <textarea
              name="instructions"
              placeholder="Provide details such as building description, security code, box number or other navigation instructions"
            />
            <br />
            <button type="submit" className="deliver">
              Deliver to this address
            </button>
          </form>
        </div>
      </main>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {addAddress: newAddress => dispatch(addAddress(newAddress))}
}
export default connect(null, mapDispatchToProps)(Checkout)
