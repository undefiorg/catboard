import React from 'react';
import numeral from 'numeral';
import styled from 'styled-components';
import _ from 'lodash'

const Container = styled.div`
  display: flex;
  padding-top: 0.3em;
  padding-bottom: 0.3em;

  div:last-child {
    text-align: right;
    padding-right: 0.6em;
  }
`

interface HeaderProps {
  total: number
  profit: number
}

const HeaderComponent: React.FC<HeaderProps & React.HTMLAttributes<HTMLDivElement>> = (props: HeaderProps) => {
  const { total, profit } = props;

  return <Container>
    <div className="header-bar">
      <span className="token-value">{numeral(total).format('($0.00a)')}</span>
      <span className="field-name">Total</span>
    </div>
    <div className="header-bar">
      <span className="field-name">Profit</span>
      <span className="token-value">{numeral(profit).format('($0.00a)')}</span>
    </div>
  </Container>
}

export default HeaderComponent;