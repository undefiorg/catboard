import React from 'react'

const CGTooltip = ({ visible = false, value = '', x = 0, y = 0, width = 64, boxSize = 10, padding = 2 }) => {
  const bp = boxSize + padding
  x = x - width / 2 - bp / 2
  x = bp * Math.floor(x / bp) + bp / 2 + padding / 2
  y = bp * Math.floor(y / bp) + bp / 2 + padding / 2 - 32
  return (
    <div
      className='tooltiptext'
      style={{
        visibility: visible ? 'visible' : 'hidden',
        left: x,
        top: y,
        width
      }}
    >
      {value}
    </div>
  )
}

export default CGTooltip
