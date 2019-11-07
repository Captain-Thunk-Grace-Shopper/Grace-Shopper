import React from 'react'
import {connect} from 'react-redux'
import {addAddress} from '../store/user'
class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    const newAddress = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      address: event.target.address.value,
      zip: event.target.zip.value,
      country: event.target.country.value,
      phoneNumber: event.target.phoneNumber.value,
      instructions: event.target.instructions.value
    }
    this.props.addAddress(newAddress)
  }
  render() {
    return (
      <main>
        <div>
          <h2>Add Shipping Address </h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name :
              <input name="firstName" type="text" />
            </label>

            <label>
              Last Name :
              <input name="lastName" type="text" />
            </label>
            <label>
              <label>
                Email :
                <input name="email" type="text" />
              </label>
              <label />
              Address :
              <input name="address" type="text" />
            </label>
            <label>
              ZIP :
              <input name="zip" type="number" />
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
            <input type="submit" value="Deliver to this Address" />
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
