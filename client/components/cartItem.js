import React from 'react'

function CartItem(props) {
  console.log('cart info', props.item)
  const cartItem = props.item
  const num = props.idx + 1
  return (
    <main>
      <h2>
        Item {num}: {cartItem.quantity}
      </h2>
    </main>
  )
}

export default CartItem
