import React from 'react'
import {Link} from 'react-router-dom'

const Products = props => {
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
      <button type="button" onClick={props.addToCart}>
        Add to cart
      </button>
    </div>
  )
}

export default Products
