const SymbolIcon: React.FC<{ symbol: string } & React.HTMLAttributes<HTMLDivElement>>
  = ({ symbol }) => <img src={`/icons/${symbol.toLowerCase()}.svg`} alt={symbol} />
export default SymbolIcon