import { useEffect, useState } from 'react'
import { createSankeyCurve, ILineConnectorsProps } from '../lib/svgx'

const LineConnectors = (props: ILineConnectorsProps) => {
  const lineHeight = 8
  const paddingTop = 0
  const paddingBottom = 15
  const strokeWidth = 0

  const { width, list } = props
  const [lineList] = useState(list)
  const [elements, setElements] = useState<any[]>()
  const [height, setHeight] = useState(paddingTop)

  useEffect(() => {
    let new_height = paddingTop
    let y1 = 0
    let y2 = 0

    const curves = lineList.map((e, i) => {
      const { a, b, c, d, t } = e
      const rowX = width
      new_height = lineHeight + Math.max(new_height, Math.max(lineHeight * a, lineHeight * b))

      const h1 = lineHeight * d
      const h2 = lineHeight / t

      const curve = createSankeyCurve(i,
        {
          x: 0,
          y: paddingTop + lineHeight * b + y1,
          w: h1,
        },
        {
          x: rowX,
          y: paddingTop + lineHeight * a + y2,
          w: h2,
        },
        {
          fill: c,
        },
      )

      y1 = y1 + d * t * h1 * 2
      y2 = y2 + d * t * 4

      return curve
    })

    setElements(curves)
    setHeight(paddingTop + strokeWidth + new_height + paddingBottom)
  }, [width, lineList])

  return <svg id='svg' width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    <g>{elements}</g>
  </svg>
}

export default LineConnectors
