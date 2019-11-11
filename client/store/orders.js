import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const defaultOrders = []

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

export const addToOpenOrder = (
  productName,
  quantity,
  price
) => async dispatch => {
  try {
    await axios.post('/api/order-items/', {name: productName, quantity, price})
    const res = await axios.get('/api/orders/openOrderProducts')
    dispatch(getOrdersAction(res.data))
  } catch (err) {
    console.log('Could not add order to cart')
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
