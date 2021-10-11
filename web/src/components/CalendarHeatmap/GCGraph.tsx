import { totalDaysInMonth, MONTH_NAMES } from '../../lib/helper'
import SVG from '../../lib/svg-jsx'
import { colors } from './GCColors'
import { getGradeFromColor } from '../../lib/converters'

export interface IBox {
  id: string,
  data: any,
  ymd: string,
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

const GCGraph: React.FC<Partial<GCGraphProps & React.HTMLAttributes<HTMLDivElement>>> = ({
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
  boxes = [],
  //@ts-ignore
  onClick,
  //@ts-ignore
  onMouseOver,
  //@ts-ignore
  onMouseOut,
}) => {
  // Canvas
  const draw = new SVG(w.toString(), h.toString())

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

  drawDays.map((day, index) => {
    draw.text({
      key: `d_${index}`,
      x: dayOffsetX,
      y: dayOffsetY + dayY,
      value: day,
      fontFamily: font,
      fontSize
    })
    dayY += boxSizePadding * 2

    return day
  })
  offsetX += 26

  // Months
  const monthOffsetX = offsetX
  const monthOffsetY = offsetY + 16
  const months = monthNames.map((name, i) => ({ name, days: totalDaysInMonth(i, year) }))

  const slideMonths = months.slice(month, 12).concat(months.slice(0, month))
  slideMonths.push(slideMonths[0])

  let totalDaysInMonthSum = 0
  slideMonths.map((month, index) => {
    const monthX = (totalDaysInMonthSum / 7.08) * boxSizePadding
    draw.text({
      key: `m_${index}`,
      x: monthOffsetX + monthX,
      y: monthOffsetY,
      value: slideMonths[index].name,
      fontFamily: font,
      fontSize
    })

    // next
    totalDaysInMonthSum += month.days

    return month
  })
  offsetY += monthHeight

  // Boxes
  if (boxes) {
    const boxOffsetX = offsetX
    const boxOffsetY = offsetY

    boxes.map((box: IBox, index: number) => {
      // Positions
      const i = boxOffsetX + boxSizePadding * Math.floor(index / limit)
      const j = boxOffsetY + boxSizePadding * (index % limit)

      // Shape
      draw.rect({
        tag: box.data,
        id: box.ymd,
        key: `b_${index}`,
        x: i,
        y: j,
        width: boxSize,
        height: boxSize,
        fill: box.color,
        onClick,
        onMouseOver,
        onMouseOut
      })

      return box
    })
    offsetY += boxOffsetY

    // Description
    colors.map((color, index) => {
      // Positions
      const maxW = boxOffsetX + boxSizePadding * Math.floor(boxes.length / limit)
      const i = maxW - (colors.length - 1) * boxSizePadding * 2 + index * boxSizePadding * 2
      const j = offsetY + boxSizePadding * limit

      draw.text({
        key: `e_${index}`,
        x: i + boxSize / 2 - fontSize / 2 + 1,
        y: j - 8,
        value: getGradeFromColor(color),
        fontFamily: font,
        fontSize
      })

      // Shape
      // @ts-ignore
      draw.rect({
        key: `c_${index}`,
        x: i,
        y: j,
        width: boxSize,
        height: boxSize,
        fill: color
      })

      return color
    })
  }

  return draw.jsx()
}

export default GCGraph
