import tokens from './tokens.json'
import pools from './pools.json'

const foo = Object.keys(tokens).map(token => `curl -O https://alpaca-app-asset.s3.ap-southeast-1.amazonaws.com/icons/coins/${token.toLowerCase()}.svg`)
console.log(foo.join('\n'))

const ibfoo = Object.values(pools)
  .filter(pool => pool.stakingToken.startsWith('ib'))
  .map(pool => `curl -O https://alpaca-app-asset.s3.ap-southeast-1.amazonaws.com/icons/coins/ib-${pool.stakingToken.slice(2).toLowerCase()}.svg`)
console.log(ibfoo.join('\n'))
