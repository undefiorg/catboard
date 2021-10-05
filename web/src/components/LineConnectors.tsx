import { useEffect, useState } from 'react'
import { createCurve, ILineConnectorsProps } from '../lib/svgx'

const LineConnectors = (props: ILineConnectorsProps) => {
  const { width, height, list } = props
  const [lineList] = useState(list)
  const [elements, setElements] = useState<any[]>()

  useEffect(() => {
    const curves = lineList.map((e, i) => {
      const { a, b, c } = e
      const rowX = width
      const lineHeight = 20
      const paddingTop = 15

      return createCurve(i,
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
        },
      )
    })

    setElements(curves)
  }, [width, lineList])

  return <svg id='svg' width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
    <g>{elements}</g>
  </svg>
}

export default LineConnectors
