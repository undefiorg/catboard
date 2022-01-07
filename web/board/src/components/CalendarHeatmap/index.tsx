import React, { useState } from 'react'
import GCGraph, { IBox } from './GCGraph'
import GCTooltip from './GCTooltip'
import styled from "styled-components";
import { getBoxesFromActivities, IActivity } from './GCHelper';
// import css from './CalendarHeatMap.module.css';

const Container = styled.div`
  .tooltiptext {
    visibility: hidden;
    font-family:'Helvetica';
    font-size: 0.8em;
    width: 100px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 4px;
    border-radius: 6px;

    position: absolute;
    top:-0px;
    left:0px;
    z-index: 1;
    pointer-events: none;
  }

  .tooltiptext::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`

interface CalenDarHeatMapProps {
  data: IActivity[]
}

const CalendarHeatmap = (props: CalenDarHeatMapProps) => {
  const { data } = props

  const [tooltip, setTooltip] = useState({
    text: '',
    x: 0,
    y: 0,
    visible: false,
  })

  const [boxes] = useState<IBox[]>(getBoxesFromActivities(data))

  const showTooltip = (e: any, svg: any) => {
    let point = svg.createSVGPoint();
    point.x = e.target.x.baseVal.value;
    point.y = e.target.y.baseVal.value;
    point = point.matrixTransform(svg.getScreenCTM());

    setTooltip(() => ({
      x: point.x,
      y: point.y,
      text: e.target.dataset.tag,
      visible: true
    }))
  }

  const onClick = (e: any, svg: any) => {
    showTooltip(e, svg)
    console.log(e.target.dataset)
  }

  const onMouseOver = showTooltip
  const onMouseOut = () => setTooltip(tooltip => ({ ...tooltip, tootltipVisible: false }))

  return (
    <Container>
      <GCGraph
        x={16}
        w={680}
        h={140}
        boxes={boxes}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      />
      <GCTooltip visible={tooltip.visible} value={tooltip.text} x={tooltip.x} y={tooltip.y} />
    </Container>
  )

}

export default CalendarHeatmap
