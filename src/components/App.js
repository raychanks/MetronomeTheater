import React from 'react';
import styled from 'styled-components';

import Bpm from './Bpm';
import Header from './Header';

const App = () => {
  return (
    <Container>
      <Header />
      <Bpm />
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-gap: 20px;
  margin: 10px;
  align-items: center;
  justify-content: center;
`;
