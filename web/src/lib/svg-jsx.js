import React from 'react'

export default class SVG {
  constructor(w = '100%', h = '100%') {
    this.elements = []
    this.w = w
    this.h = h

    this.tooltipX = 0
    this.tooltipY = 0
  }

  size = (w, h) => {
    this.w = w
    this.h = h
    return this
  }

  text = ({ x = 0, y = 0, key, value, fontSize = 9, fontFamily = 'Helvetica' }) => {
    return this.elements.push(React.createElement('text', { key, x, y, fontSize, fontFamily }, value))
  }

  rect = ({ x = 0, y = 0, rx = 2, ry = 2, width = 0, height = 0, fill = '#000000', tag, id, key, onClick, onMouseOver, onMouseOut }) => {
    return this.elements.push(React.createElement('rect',
      { key, x, y, rx, ry, width, height, fill, 'data-tag': tag, 'data-id': id, onClick, onMouseOver, onMouseOut }
    ))
  }

  jsx = () => (
    <div>
      <svg width={this.w} height={this.h}><g>{this.elements}</g></svg>
    </div>
  )
}
