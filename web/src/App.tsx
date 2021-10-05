
import './App.css';
import styled from 'styled-components';

import FarmComponent from './components/FarmComponent';
import RewardComponent from './components/RewardComponent';

const Container = styled.div``

function App() {
  const farms = [{
    stratSymbol: 'CAKE',
    principalSymbol: 'USDT',
    farmName: 'CAKE-USDT',
    investmentType: 'farm',
    stratValue: 1234.56,
    principalValue: 1234.56,
  }, {
    stratSymbol: 'ALPACA',
    principalSymbol: 'USDT',
    farmName: 'ALPACA-USDT',
    investmentType: 'stake',
    stratValue: 1234.56,
    principalValue: 1234.56,
  }, {
    stratSymbol: 'CAKE',
    principalSymbol: 'BUSD',
    farmName: 'CAKE-BUSD',
    investmentType: 'farm',
    stratValue: 1234.56,
    principalValue: 1234.56,
  }]

  const rewards = [{
    poolName: 'ibBNB',
    investmentType: 'stake',
    rewardValue: 123.45,
    rewardSymbol: 'ALPACA',
  }, {
    poolName: 'ibETH',
    investmentType: 'stake',
    rewardValue: 56.78,
    rewardSymbol: 'ALPACA',
  }, {
    poolName: 'ibALPACA',
    investmentType: 'stake',
    rewardValue: 456.78,
    rewardSymbol: 'ALPACA',
  }]

  return (
    <Container>
      <FarmComponent data={farms} />
      <RewardComponent data={rewards} />
    </Container>
  );
}

export default App;
