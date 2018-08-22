import React from 'react';
import styled from 'styled-components';

import Bpm from './Bpm';
import Header from './Header';
import OddTime from './OddTime';

const App = () => {
  return (
    <Container>
      <Header />
      <Bpm />
      <OddTime />
    </Container>
  );
};

export default App;

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header header'
    'basic odd';
  grid-gap: 20px;
  margin: 10px;
  align-items: center;
  justify-content: center;
`;
