import React, { useState } from 'react'
import GCGraph, { IBox } from './GCGraph'
import GCTooltip from './GCTooltip'
import styled from "styled-components";
import { getBoxesFromActivities } from './GCHelper';
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

const CalendarHeatmap = (props: any) => {
  const [foo, setFoo] = useState({
    w: props.w || '100%',
    h: props.h || '100%',
    tooltipX: 100,
    tooltipY: 100,
    data: props.data,
    tooltipText: '',
  })

  const [boxes, setBoxes] = useState<IBox[]>(getBoxesFromActivities(foo.data))

  const [visible, setVisible] = useState(false)

  const showTooltip = (e: any) => {
    const { pageX: tooltipX, pageY: tooltipY } = e
    setVisible(true)
    setFoo(foo => ({
      ...foo,
      tooltipX,
      tooltipY,
      tooltipText: e.target.dataset.tag,
      tootltipVisible: true
    }))
  }

  const onClick = (e: any) => {
    setVisible(visible => !visible)
    console.log(e.target.dataset)
  }

  const onMouseOver = showTooltip
  const onMouseOut = () => setVisible(false)

  return (
    <Container>
      <GCGraph
        x={16}
        w={720}
        h={160}
        boxes={boxes}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      />
      <GCTooltip visible={visible} value={foo.tooltipText} x={foo.tooltipX} y={foo.tooltipY} />
    </Container>
  )

}

export default CalendarHeatmap
