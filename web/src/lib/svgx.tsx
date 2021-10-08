export interface IPoint {
  x: number
  y: number
  w: number
}

export const createCurve = (key: number, p1: IPoint, p2: IPoint, props?: any) => {
  const strokeWidth = 3
  const strokeWidth_2 = strokeWidth / 2
  const handleX = (p2.x - p1.x) / 2
  const padding = 8
  const c1 = { x: handleX + padding, y: p1.y }
  const c2 = { x: p2.x - handleX - padding, y: p2.y }
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

export const createSankeyCurve = (key: number, p1: IPoint, p2: IPoint, props?: any) => {
  const handleX = (p2.x - p1.x) / 3
  const padding = 0
  const c1 = { x: handleX + padding, y: p1.y }
  const c2 = { x: p2.x - handleX - padding, y: p2.y }

  let d = `M${p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`
  d = d + ` ${p2.x},${p2.y} ${p2.x},${p2.y + p2.w}`
  const flag = c1.y > c2.y ? 1 : -1
  d = d + ` ${p2.x},${p2.y + p2.w} C${c2.x + p2.w * flag},${c2.y + p2.w} ${c1.x + p1.w * flag},${c1.y + p1.w} ${p1.x},${p1.y + p1.w}`
  d = d + `Z`
  const base = {
    key, d,
    stroke: '#000000',
    strokeWidth: 0,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'red'
  }

  return <path {...base} {...props} d={d} />
}

export interface ILineConnectorsElement {
  a: number
  b: number
  c: string
  d: number
  t: number
}

export interface ILineConnectorsProps {
  width: number
  height?: number | string
  list: ILineConnectorsElement[]
}