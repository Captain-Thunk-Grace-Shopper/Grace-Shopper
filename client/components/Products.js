import React from 'react'
import {Link} from 'react-router-dom'

const Products = props => {
  return (
    <div>
      <Link to={`/products/${props.products.id}`}>
        <h5>{props.products.name}</h5>
      </Link>
      <img height="100px" width="100px" src={props.products.imgUrl} />
    </div>
  )
}

export default Products
