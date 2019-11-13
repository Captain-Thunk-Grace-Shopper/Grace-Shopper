import axios from 'axios'
import {userInfo} from 'os'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'
const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM'
const UPDATE_ORDER_ITEM = 'UPDATE_ORDER_ITEM'
const CLOSE_OPEN_ORDER = 'CLOSE_OPEN_ORDER'
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
const updateItemAction = orderItem => ({type: UPDATE_ORDER_ITEM, orderItem})
const closeOrderAction = () => ({type: CLOSE_OPEN_ORDER})

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

export const removeFromOpenOrder = itemId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/order-items/${itemId}`)
      dispatch(removeFromOrderAction(itemId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateOpenOrder = (itemId, quantity) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/order-items/${itemId}`, {quantity})
      dispatch(updateItemAction(data))
    } catch (error) {
      console.log("couldn't update", error)
    }
  }
}

export const closeOpenOrder = (address, name) => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders`, {address, name})
      dispatch(closeOrderAction())
    } catch (error) {
      console.log(error)
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
      return [...state, action.orderItem]
    case REMOVE_ORDER_ITEM:
      return state.filter(item => {
        //user
        if (!item.cartItemId) {
          return item['order-item'].id !== action.orderItemId
        } else {
          //guest
          return item.cartItemId !== action.orderItemId
        }
      })
    case UPDATE_ORDER_ITEM:
      return state.map(item => {
        //user
        if (!item.cartItemId) {
          if (item['order-item'].id === action.orderItem['order-item'].id) {
            return action.orderItem
          }
        }
        //guest
        if (item.cartItemId === action.orderItem.cartItemId) {
          return action.orderItem
        }
        return item
      })
    case CLOSE_OPEN_ORDER:
      return []
    default:
      return state
  }
}
