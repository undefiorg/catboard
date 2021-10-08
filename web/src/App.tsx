
import './App.css';
import styled from 'styled-components';

import FarmComponent from './components/FarmComponent';
import RewardComponent from './components/RewardComponent';
import HeaderComponent from './components/HeaderComponent';

const Container = styled.div`
  font-family: "SF Pro TH","SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
  width: fit-content;
  padding: 1em;

  h3 {
    padding: 0em;
    margin: 0.3em;
    line-height: 1em;
    color: #929292;
    font-weight: 400;
  }
`

function App() {
  const farms = [{
    stratSymbol: 'CAKE',
    principalSymbol: 'USDT',
    farmName: 'CAKE^USDT',
    farmType: 'single',
    investmentType: 'farm',
    stratValue: 1,
    principalValue: 0,
  }, {
    stratSymbol: 'CAKE',
    principalSymbol: 'USDT',
    farmName: 'CAKE-USDT',
    farmType: 'pair',
    investmentType: 'farm',
    stratValue: 1234.56,
    principalValue: 1234.56,
  }, {
    stratSymbol: 'ALPACA',
    principalSymbol: 'USDT',
    farmName: 'ALPACA-USDT',
    farmType: 'pair',
    investmentType: 'stake',
    stratValue: 1234.56,
    principalValue: 1234.56,
  }, {
    stratSymbol: 'CAKE',
    principalSymbol: 'BUSD',
    farmName: 'CAKE-BUSD',
    farmType: 'pair',
    investmentType: 'farm',
    stratValue: 1234.56,
    principalValue: 1234.56,
  }]

  const rewards = [{
    poolName: 'ibBNB',
    poolType: 'pair',
    investmentType: 'stake',
    rewardValue: 123.45,
    rewardSymbol: 'ALPACA',
  }, {
    poolName: 'ibETH',
    poolType: 'pair',
    investmentType: 'stake',
    rewardValue: 56.78,
    rewardSymbol: 'ALPACA',
  }, {
    poolName: 'ibALPACA',
    poolType: 'pair',
    investmentType: 'stake',
    rewardValue: 456.78,
    rewardSymbol: 'ALPACA',
  }]

  return (
    <Container>
      <h3>FARM</h3>
      <HeaderComponent total={1239} profit={3434} />
      <FarmComponent data={farms} />
      <h3>STAKE</h3>
      <HeaderComponent total={123456} profit={3434} />
      <RewardComponent data={rewards} />
    </Container>
  );
}

export default App;
