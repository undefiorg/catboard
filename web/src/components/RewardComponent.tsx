import React from 'react';

import LineConnectors from './LineConnectors';
import TokenBar from './TokenBar';
import SourceBar from './SourceBar';

import { symbolColorMap } from '../styles/symbolColor';
import styled from 'styled-components';

import _ from 'lodash'

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

  svg{
    padding-top: 0.3em;
  }
`
interface IRewardData {
  poolName: string
  investmentType: string
  rewardValue: number
  rewardSymbol: string
}

interface IRewardComponentProps {
  data: IRewardData[]
}

const REWARD_SYMBOLS = ['ALPACA']

const RewardComponent: React.FC<IRewardComponentProps & React.HTMLAttributes<HTMLDivElement>>
  = (props: { data: IRewardData[] }) => {
    const { data } = props
    let foo = []

    // get all symbols
    const symbols = [...Array.from(new Set(data.map(e => e.rewardSymbol)))]

    // get all sources
    const equities = symbols.map(e => {
      return {
        symbol: e,
        value: _.sumBy(data, d => d.rewardSymbol === e ? d.rewardValue : 0),
      }
    }).filter(e => REWARD_SYMBOLS.includes(e.symbol))

    // get all sources
    const sources = [...Array.from(new Set(data.map(e => ({
      name: e.poolName,
      value: e.rewardValue,
    }))))]
    const sourceNames = sources.map(e => e.name)

    // map rewards to symbols
    for (let { rewardSymbol, poolName } of data) {
      const poolSymbol = poolName.substring(2).toUpperCase()

      foo.push({
        a: REWARD_SYMBOLS.indexOf(rewardSymbol),
        b: sourceNames.indexOf(poolName),
        c: symbolColorMap(poolSymbol),
        d: 0.3,
        t: 3,
      })
    }

    foo = [...Array.from(new Set(foo))]

    return (
      <Container>
        <SourceBar sources={sources} />
        <LineConnectors width={64} height={320} list={foo} />
        <TokenBar equities={equities} />
      </Container>
    );
  }

export default RewardComponent;
