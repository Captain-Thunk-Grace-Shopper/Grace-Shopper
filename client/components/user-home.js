import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import PastOrder from './PastOrder'
import Cart from './cart'
import {getPastOrders} from '../store/past-orders'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.getPastOrders()
  }

  render() {
    const {name} = this.props
    const {email} = this.props
    const pastOrders = this.props.pastOrders

    if (!pastOrders.length) {
      return <h1>No past orders</h1>
    }
    return (
      <div>
        <h3>Welcome, {email}!</h3>
        <div className="user-home-current-cart">
          <h2>Current Cart</h2>
          <Cart />
        </div>
        <h2>Past Orders</h2>
        {pastOrders.map((order, idx) => (
          <div key={idx}>
            <h3>Order {idx + 1}</h3>
            <PastOrder items={order} />
          </div>
        ))}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('mapping past orders state to props', state.pastOrders)
  return {
    email: state.user.email,
    name: state.user.firstName,
    pastOrders: state.pastOrders
  }
}

const mapDispatchToProps = dispatch => ({
  getPastOrders: () => dispatch(getPastOrders())
})
export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
