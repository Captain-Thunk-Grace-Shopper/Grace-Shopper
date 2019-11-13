import React from 'react'

const PastOrder = props => {
  const items = props.items
  return (
    <div>
      {items.map(item => (
        <div key={item['order-item'].id}>
          {item.name}
          <br />
          ${Math.floor(
            item['order-item'].price * item['order-item'].quantity * 100
          ) / 100}
        </div>
      ))}
    </div>
  )
}

export default PastOrder
