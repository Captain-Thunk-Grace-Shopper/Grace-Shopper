import React from 'react'

function CartItem(props) {
  return (
    <h1>
      {props.item.name} {props.item.price}{' '}
    </h1>
  )
}

export default CartItem
