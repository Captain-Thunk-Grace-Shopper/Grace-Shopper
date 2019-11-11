import React from 'react'
import {Link} from 'react-router-dom'

const Products = props => {
  const productName = props.products.name
  const productId = props.products.id
  const quantity = 1
  const price = props.products.price
  return (
    <div>
      <Link to={`/products/${props.products.id}`}>
        <div id="grocery-list-image-container">
          <img src={props.products.imgUrl} id="grocery-list-image" />
        </div>
        <div id="grocery-list-name">
          <p>
            <b>{props.products.name}</b>
          </p>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => {
          props.addToCart(productName, quantity, price)
        }}
      >
        Add to cart
      </button>
    </div>
  )
}

export default Products
