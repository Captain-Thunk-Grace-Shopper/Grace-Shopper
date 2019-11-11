import React from 'react'

function CartItem(props) {
  const cartItem = props.item
  const num = props.idx + 1
  const name = cartItem.name
  const quantity = cartItem.quantity || cartItem['order-item'].quantity
  const price =
    cartItem.price * quantity || cartItem['order-item'.price] * quantity

  return (
    <main>
      <div>
        Item {num}: {name}, Quantity: {quantity}, Price: $ {price}
      </div>
    </main>
  )
}

export default CartItem
