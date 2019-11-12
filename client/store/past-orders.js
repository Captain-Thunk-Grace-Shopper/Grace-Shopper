import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PAST_ORDERS = 'GET_PAST_ORDERS'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const getPastOrdersAction = pastOrders => ({type: GET_PAST_ORDERS, pastOrders})

/**
 * THUNK CREATORS
 */

export const getPastOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders/pastOrders')
    dispatch(getPastOrdersAction(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {
  switch (action.type) {
    case GET_PAST_ORDERS:
      return action.pastOrders
    default:
      return state
  }
}
