import styled from "styled-components";
import SymbolIcon from "./SymbolIcon";
import numeral from 'numeral';

interface IEquity {
  symbol: string
  value: number
}

interface TokenBarProps {
  equities: IEquity[]
}

const Container = styled.div`
  padding-top: 0.3em;

  .token {
    display: flex;

    .token-name {
      width: -webkit-fill-available;
      text-align: left;
      padding-left: 0.3em;
      padding-right: 0.3em;
    }
  }
`

const TokenBar: React.FC<TokenBarProps & React.HTMLAttributes<HTMLDivElement>> = (props: TokenBarProps) => {
  const { equities } = props
  return <Container>
    {equities.map((equity, i) => {
      return (
        <div key={i} className="token">
          <span className="symbol-icon">
            <SymbolIcon symbol={equity.symbol} />
          </span>
          <span className="token-name">{equity.symbol}</span>
          <span className="token-value">{numeral(equity.value).format('($0.00a)')}</span>
        </div>
      );
    })
    }</Container>
}

export default TokenBar;