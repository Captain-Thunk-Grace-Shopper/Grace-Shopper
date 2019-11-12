import React from 'react'
import {Link} from 'react-router-dom'

class LastPage extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <h2>Thank You For Shopping With Us</h2>
        <Link to="/">
          <h3>Continue Shopping</h3>
        </Link>
      </div>
    )
  }
}

export default LastPage
