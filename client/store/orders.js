import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const defaultOrder = {}

/**
 * ACTION CREATORS
 */
const getOrdersAction = orders => ({type: GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const getOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders')
    dispatch(getOrdersAction(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getOpenOrder = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders/openOrderProducts')
    dispatch(getOrdersAction(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
