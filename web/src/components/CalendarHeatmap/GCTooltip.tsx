const CGTooltip = ({ visible = false, value = '', x = 0, y = 0, width = 72, boxSize = 10, padding = 2 }) => {
  x = x - width / 2
  y = y - boxSize * 2 - padding * 2 - 4
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
