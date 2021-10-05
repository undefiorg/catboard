export interface IPoint {
  x: number
  y: number
}

export const createCurve = (key: number, p1: IPoint, p2: IPoint, props?: any) => {
  const strokeWidth = 3
  const strokeWidth_2 = strokeWidth / 2
  const handleX = (p2.x - p1.x) / 2
  const c1 = { x: handleX, y: p1.y }
  const c2 = { x: p2.x - handleX, y: p2.y }
  const d = `M${strokeWidth_2 + p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${-strokeWidth_2 + p2.x},${p2.y}`
  const base = {
    key, d,
    stroke: '#000000',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none'
  }

  return <path {...base} {...props} d={d} />
}

export interface ILineConnectorsElement {
  a: number
  b: number
  c: string
}

export interface ILineConnectorsProps {
  width: number
  height: number
  list: ILineConnectorsElement[]
}