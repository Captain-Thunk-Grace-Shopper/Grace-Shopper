import React from 'react'
import {Link} from 'react-router-dom'
class Payment extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <main>
        <div>
          <h3>Payment Information:</h3>
          <label>
            Card Owner:<input name="cardOwner" type="text" />
          </label>
          <label>
            Card Type:{' '}
            <select name="cardType">
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </label>
          <label>
            Card Number:<input name="cardNumber" type="number" />
          </label>
          <label>
            CVV:<input name="cvv" type="number" />
          </label>
          <label>
            Expiration Date:<input name="expDate" type="date" />
          </label>
          <label>
            Billing Address:<input name="billAddress" type="text" />
          </label>
          <br />
          <Link to="/lastpage">
            <button type="submit" className="deliver">
              Place Your Order
            </button>
          </Link>
        </div>
      </main>
    )
  }
}

export default Payment
