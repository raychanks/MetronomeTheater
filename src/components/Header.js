// @flow
import * as React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <nav>
      <HeaderText>MetronomeTheater</HeaderText>
      <Text>
        A metronome for musicians.
      </Text>
      <Text>
        Support for both simple and odd time signatures.
      </Text>
    </nav>
  );
};

export default Header;

const HeaderText = styled.p`
  font-size: 2em;
  font-weight: bold;
  margin: 10px 0;
`;

const Text = styled.p`
  font-size: 1.2em;
  margin: 0;
  text-align: start;
`;
