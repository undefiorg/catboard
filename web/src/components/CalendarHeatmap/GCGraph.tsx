import { useRef } from 'react'
import { totalDaysInMonth, MONTH_NAMES } from '../../lib/helper'
import { colors } from './GCColors'

export interface IBox {
  id: string,
  data: any,
  date: string,
  color: string,
}

export type GCGraphProps = {
  x: number,
  y: number,
  w: number,
  h: number,
  font: string,
  fontSize: number,
  year: number,
  month: number,
  boxSize: number,
  limit: number,
  padding: number,
  monthNames: string[],
  boxes: IBox[],
  onClick: any,
  onMouseOver: any,
  onMouseOut: any,
}

const GCGraph = ({
  x = 0,
  y = 0,
  w = 640,
  h = 320,
  font = 'Helvetica',
  fontSize = 9,
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  boxSize = 10,
  limit = 7,
  padding = 2,
  monthNames = MONTH_NAMES,
  boxes,
  //@ts-ignore
  onClick,
  //@ts-ignore
  onMouseOver,
  //@ts-ignore
  onMouseOut,
}: Partial<GCGraphProps>) => {
  const ref = useRef(null)

  // Elements
  let elements = []

  // Global
  const boxSizePadding = boxSize + padding
  const monthHeight = 24
  let offsetX = x
  let offsetY = y

  // Days
  const dayOffsetX = offsetX
  const dayOffsetY = offsetY + monthHeight + 6
  let dayY = boxSizePadding // Start at Sunday
  const drawDays = ['Mon', 'Wed', 'Fri']

  elements.push(drawDays.map((day, index) => {
    const text = <text {...{
      key: `d_${index}`,
      x: dayOffsetX,
      y: dayOffsetY + dayY,
      fontFamily: font,
      fontSize
    }} >{day}</text>

    dayY += boxSizePadding * 2

    return text
  }))

  offsetX += 26

  // Months
  const monthOffsetX = offsetX
  const monthOffsetY = offsetY + 16
  const months = monthNames.map((name, i) => ({ name, days: totalDaysInMonth(i, year) }))

  const slideMonths = months.slice(month, 12).concat(months.slice(0, month))
  slideMonths.push(slideMonths[0])

  let totalDaysInMonthSum = 0
  elements.push(slideMonths.map((month, index) => {
    const monthX = (totalDaysInMonthSum / 7.08) * boxSizePadding
    const text = <text {...{
      key: `m_${index}`,
      x: monthOffsetX + monthX,
      y: monthOffsetY,
      fontFamily: font,
      fontSize
    }}>{slideMonths[index].name}</text>

    // next
    totalDaysInMonthSum += month.days

    return text
  }))
  offsetY += monthHeight

  // Boxes
  if (boxes) {
    const boxOffsetX = offsetX
    const boxOffsetY = offsetY

    elements.push(boxes.map((box: IBox, index: number) => {
      // Positions
      const i = boxOffsetX + boxSizePadding * Math.floor(index / limit)
      const j = boxOffsetY + boxSizePadding * (index % limit)

      // Shape
      return <rect {...{
        'data-tag': box.data,
        'data-id': box.date,
        key: `b_${index}`,
        x: i,
        y: j,
        rx: 2,
        ry: 2,
        width: boxSize,
        height: boxSize,
        fill: box.color,
        onClick,
        onMouseOver: (e) => onMouseOver(e, ref.current),
        onMouseOut
      }} />
    }))

    // Description
    const marginTop = 8
    const marginLeft = 16
    let offsetLabelX = 0
    elements = elements.concat(colors.map((color, index) => {
      // Positions
      const j = marginTop + offsetY + boxSizePadding * limit
      const key = Object.keys(color)[0]

      const labelWidth = (index === 0 ? 0 : Object.keys(colors[index - 1])[0].length * fontSize / 2)
      offsetLabelX += labelWidth + boxSize + 16

      return [
        <text {...{
          key: `e_${index}`,
          x: marginLeft + offsetLabelX + boxSize + 3,
          y: j + boxSize / 2 + fontSize / 2 - 1,
          fontFamily: font,
          fontSize
        }}>{key}</text>,
        <rect {...{
          key: `c_${index}`,
          x: marginLeft + offsetLabelX,
          y: j,
          rx: 2,
          ry: 2,
          width: boxSize,
          height: boxSize,
          fill: Object.values(color)[0]
        }} />
      ]
    }))
  }

  return <svg ref={ref} id='svg' width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
    <g>{elements}</g>
  </svg>
}

export default GCGraph
