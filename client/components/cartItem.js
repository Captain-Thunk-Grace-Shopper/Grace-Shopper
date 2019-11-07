import React from 'react'

function CartItem(props) {
  const cartItem = props.item
  const num = props.idx + 1
  return (
    <main>
      <div>
        Item {num}: {cartItem.name}, Quantity: {cartItem['order-item'].quantity},
        Price: {cartItem['order-item'].price}
      </div>
    </main>
  )
}

export default CartItem
