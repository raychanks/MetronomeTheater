// @flow
import * as React from 'react';
import styled from 'styled-components';

const Header = (props) => {
  return (
    <Container>
      <HeaderText>MetronomeTheater</HeaderText>
      <Text>
        Support for both simple and odd time signatures.
      </Text>
      <Text>
        A metronome for musicians.
      </Text>

      <ButtonContainer>
        <Button
          onClick={props.toggleMetronomeMode('basic')}
          active={props.useSimpleMetronome}
        >
          Classic Mode
        </Button>

        <Button
          onClick={props.toggleMetronomeMode('odd')}
          active={!props.useSimpleMetronome}
        >
          Odd Time Mode
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Header;

const Container = styled.nav`
  grid-area: header;
  display: grid;
  text-align: center;
`;

const HeaderText = styled.p`
  font-size: 2em;
  font-weight: bold;
  margin: 10px 0;
`;

const Text = styled.p`
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const Button = styled.button`
  background: #DCEDC8;
  border: 2px solid #C5E1A5;
  border-radius: 5px;
  width: 160px;
  height: 40px;
  outline: none;
  font-size: 1.2em;
  cursor: pointer;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
  color: #555;

  ${props => props.active ? `
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    background: #9CCC65;
    border: 2px solid #8BC34A;
  ` : null}
`;