import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLEPRODUCT = 'GET_SINGLEPRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * ACTION CREATORS
 */
const getProductsAction = products => ({
  type: GET_PRODUCTS,
  products
})

const gotSingleProduct = product => ({
  type: GET_SINGLEPRODUCT,
  product
})

/**
 * THUNK CREATORS
 */
export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(getProductsAction(res.data || defaultProducts))
  } catch (err) {
    console.error(err)
  }
}
export const getSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(gotSingleProduct(res.data || defaultProducts))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case GET_SINGLEPRODUCT:
      return action.product
    default:
      return state
  }
}
