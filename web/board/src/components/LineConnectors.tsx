import { useEffect, useState } from 'react'
import { createCurve, ILineConnectorsProps } from '../lib/SVGLine'

const LineConnectors = (props: ILineConnectorsProps) => {
  const lineHeight = 20
  const paddingTop = 15
  const paddingBottom = 15
  const strokeWidth = 3

  const { width, list } = props
  const [lineList] = useState(list)
  const [elements, setElements] = useState<any[]>()
  const [height, setHeight] = useState(paddingTop)

  useEffect(() => {
    let new_height = paddingTop

    const curves = lineList.map((e, i) => {
      const { a, b, c } = e
      const rowX = width
      new_height = Math.max(new_height, Math.max(lineHeight * a, lineHeight * b))

      const curve = createCurve(i,
        {
          x: 0,
          y: paddingTop + lineHeight * b
        },
        {
          x: rowX,
          y: paddingTop + lineHeight * a
        },
        {
          stroke: c,
          strokeWidth,
        },
      )

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
