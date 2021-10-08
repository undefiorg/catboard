import React from 'react';

import LineConnectors from './LineConnectors';
import TokenBar from './TokenBar';
import SourceBar from './SourceBar';

import { symbolColorMap } from '../styles/symbolColor';
import styled from 'styled-components';

import _ from 'lodash'
import { ILineConnectorsElement } from '../lib/svgx';

const Container = styled.div`
  display: flex;
  line-height: 20px;

  .symbol-icon {
    display: flex;
    align-items: center;
    text-align: right;
    padding-left: 0.3em;
    padding-right: 0.3em;

    img {
      display: block;
      width: 16px;
      height: 16px;
    }
  }

  svg {
    padding-top: 0.3em;
  }
`
interface IFarmData {
  stratSymbol: string
  principalSymbol: string
  farmName: string
  investmentType: string
  stratValue: number
  principalValue: number
}

interface IFarmComponentProps {
  data: IFarmData[]
}

const FarmComponent: React.FC<IFarmComponentProps & React.HTMLAttributes<HTMLDivElement>>
  = (props: { data: IFarmData[] }) => {
    const { data } = props
    let foo: ILineConnectorsElement[] = []

    // get all symbols
    const symbols = [...Array.from(new Set(data.map(e => [e.stratSymbol, e.principalSymbol]).flat()))]

    // get all sources
    const equities = symbols.map(e => {
      return {
        symbol: e,
        value: _.sumBy(data, d => d.stratSymbol === e ? d.stratValue : 0) +
          _.sumBy(data, d => d.principalSymbol === e ? d.principalValue : 0),
      }
    })

    // get all sources
    const sources = [...Array.from(new Set(data.map(e => ({
      name: e.farmName,
      value: e.stratValue + e.principalValue
    }))))]
    const sourceNames = sources.map(e => e.name)

    // map farms to symbols
    for (let { principalSymbol, stratSymbol, farmName, stratValue, principalValue } of data) {
      const totalStratValue = _.sumBy(data, d => d.stratSymbol === stratSymbol ? d.stratValue : 0)
      const totalPrincipalValue = _.sumBy(data, d => d.principalSymbol === principalSymbol ? d.principalValue : 0)
      const totalValue = totalStratValue + totalPrincipalValue

      const principalSymbolCountMap = _.countBy(data, 'principalSymbol')
      const stratSymbolCountMap = _.countBy(data, 'stratSymbol')

      foo.push(
        {
          a: symbols.indexOf(stratSymbol),
          b: sourceNames.indexOf(farmName),
          c: symbolColorMap(stratSymbol),
          d: principalValue / totalValue,
          t: stratSymbolCountMap[stratSymbol],
        },
        {
          a: symbols.indexOf(principalSymbol),
          b: sourceNames.indexOf(farmName),
          c: symbolColorMap(principalSymbol),
          d: stratValue / totalValue,
          t: principalSymbolCountMap[principalSymbol],
        })
    }

    foo = [...Array.from(new Set(foo))]

    console.table(foo)

    return <Container>
      <SourceBar sources={sources} />
      <LineConnectors width={64} list={foo} />
      <TokenBar equities={equities} />
    </Container>
  }

export default FarmComponent;
