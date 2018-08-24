// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  beatsPerMinute: number,
  increment: () => void,
  decrement: () => void,
  onChangeBpmInput: (event: SyntheticKeyboardEvent<HTMLInputElement>) => mixed,
  onBlurBpmInput: () => mixed,
  speedFactor: number,
  isPlaying: boolean,
};

const BpmDisplay = ({
  beatsPerMinute,
  increment,
  decrement,
  onChangeBpmInput,
  onBlurBpmInput,
  speedFactor,
  isPlaying,
}: Props) => {
  return (
    <Container>
      <Text>Beats Per Minute</Text>

      <Button onClick={decrement}>-</Button>

      <BpmInput
        type='text'
        value={Math.round(beatsPerMinute * speedFactor / 100)}
        disabled={isPlaying}
        onChange={onChangeBpmInput}
        onBlur={onBlurBpmInput}
      />

      <Button onClick={increment}>+</Button>
    </Container>
  );
};

export default BpmDisplay;

const Container = styled.div`
  width: 210px;
  height: 80px;
  margin: 15px;
  display: grid;
  grid-template-columns: 50px 90px 50px;
  grid-template-rows: 30px 40px;
  grid-gap: 10px;
  align-items: center;
  justify-items: center;
`;

const Button = styled.button`
  border-radius: 50%;
  box-sizing: border-box;
  border: 3px solid steelblue;
  background: none;
  height: 40px;
  width: 40px;
  font-size: 1.5em;
  font-weight: bold;
  color: steelblue;
  cursor: pointer;
  outline: none;
  user-select: none;

  :active {
    background: #eee;
  };
`;

const BpmInput = styled.input`
  height: 40px;
  width: 90px;
  box-sizing: border-box;
  border: 1px solid steelblue;
  border-radius: 2px;
  text-align: center;
  font-size: 1.5em;
  color: steelblue;
`;

const Text = styled.p`
  font-size: 1.5em;
  color: steelblue;
  margin: 0;
  grid-column: 1 / 4;
`;
