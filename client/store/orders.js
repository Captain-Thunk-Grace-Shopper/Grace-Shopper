import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'
const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const getOrdersAction = orders => ({type: GET_ORDERS, orders})
const addToOrderAction = orderItem => ({type: ADD_ORDER_ITEM, orderItem})
const removeFromOrderAction = orderItemId => ({
  type: REMOVE_ORDER_ITEM,
  orderItemId
})

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

// export const addToOpenOrder = (
//   productName,
//   quantity,
//   price
// ) => async dispatch => {
//   try {
//     await axios.post('/api/order-items/', {name: productName, quantity, price})
//     const res = await axios.get('/api/orders/openOrderProducts')
//     dispatch(getOrdersAction(res.data))
//   } catch (err) {
//     console.log('Could not add order to cart')
//     console.error(err)
//   }
// }

export const addToOpenOrder = (
  productName,
  quantity,
  price
) => async dispatch => {
  try {
    const {data} = await axios.post('/api/order-items/', {
      name: productName,
      quantity,
      price
    })
    dispatch(addToOrderAction(data))
  } catch (err) {
    console.log('Could not add order item to cart')
    console.error(err)
  }
}

// export const removeFromOpenOrder = itemId => {
//   return async dispatch => {
//     await axios.delete(`/api/order-items/${itemId}`)
//     const {data} = await axios.get('/api/orders/openOrderProducts')
//     dispatch(getOrdersAction(data))
//   }
// }
export const removeFromOpenOrder = itemId => {
  return async dispatch => {
    await axios.delete(`/api/order-items/${itemId}`)
    dispatch(removeFromOrderAction(itemId))
  }
}

export const updateOpenOrder = (itemId, quantity) => {
  return async dispatch => {
    try {
      await axios.put(`/api/order-items/${itemId}`, {quantity})
      const {data} = await axios.get('/api/orders/openOrderProducts')
      dispatch(getOrdersAction(data))
    } catch (error) {
      console.log("couldn't update", error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case ADD_ORDER_ITEM:
      return [...state, action.order]
    case REMOVE_ORDER_ITEM:
      let stateCopy = state.filter(item => {
        return item.id !== action.orderItemId
      })
      return stateCopy
    default:
      return state
  }
}
