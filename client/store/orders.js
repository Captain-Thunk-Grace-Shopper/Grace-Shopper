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

export const removeFromOpenOrder = itemId => {
  return async dispatch => {
    await axios.delete(`/api/order-items/${itemId}`)
    const {data} = await axios.get('/api/orders/openOrderProducts')
    dispatch(getOrdersAction(data))
  }
}

export const updateOpenOrder = (itemId, quantity) => {
  return async dispatch => {
    try {
      console.log('INSIDE THUNK: ', itemId, quantity)
      await axios.put(`/api/order-items/${itemId}`, {quantity})
      const {data} = await axios.get('/api/orders/openOrderProducts')
      dispatch(getOrdersAction(data))
    } catch (error) {
      console.log("couldn't update", error)
    }
  }
}

export const closeOpenOrder = (address, name) => {
  return async () => {
    try {
      await axios.put(`/api/orders`, {address, name})
    } catch (error) {
      console.log(error)
    }
  }
}
/**
 *
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
