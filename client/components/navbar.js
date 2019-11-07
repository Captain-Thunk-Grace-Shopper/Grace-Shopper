import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <Link to="/" className="nav-title">
        Grace Shopper
      </Link>

      {isLoggedIn ? (
        <div className="logged-in-nav">
          <ul id="nav-bar-ul">
            <li>
              {/* The navbar will show these links after you log in */}
              <Link to="/home" className="nav-item right-nav">
                Home
              </Link>
            </li>
            <li>
              <a href="#" className="nav-item right-nav" onClick={handleClick}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <ul id="nav-bar-ul">
            <li>
              <Link to="/login" className="nav-item right-nav">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="nav-item right-nav">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
