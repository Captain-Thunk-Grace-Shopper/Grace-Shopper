import React from 'react'

const PastOrder = props => {
  const items = props.items
  return (
    <div>
      {items.map(item => (
        <div key={item['order-item'].id}>
          {item.name}
          <br />
          {item.price}
        </div>
      ))}
    </div>
  )
}

export default PastOrder
