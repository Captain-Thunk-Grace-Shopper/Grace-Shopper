import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Home} from '../components'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <div id="auth-form-container">
        <h2>{displayName}</h2>
        <form onSubmit={handleSubmit} name={name}>
          <div id="email-password">
            <div>
              <label htmlFor="email">Email</label>
              <input name="email" type="text" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input name="password" type="password" />
            </div>
            <div>
              <button type="submit" className="submit-login">
                {displayName}
              </button>
            </div>
          </div>

          {error && error.response && <div> {error.response.data} </div>}
          <a href="/auth/google">
            <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" />
          </a>
        </form>
      </div>
      <Home />
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
