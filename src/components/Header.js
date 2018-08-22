// @flow
import * as React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <HeaderText>MetronomeTheater</HeaderText>
      <Text>
        Support for both simple and odd time signatures.
      </Text>
      <Text>
        A metronome for musicians.
      </Text>
    </Container>
  );
};

export default Header;

const Container = styled.nav`
  grid-area: header;
  text-align: center;
`;

const HeaderText = styled.p`
  font-size: 2em;
  font-weight: bold;
  margin: 10px 0;
`;

const Text = styled.p`
  font-size: 1.2em;
  margin: 0;
`;
