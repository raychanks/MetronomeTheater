// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {

};

type State = {
  isPlaying: boolean,
};

class MainButton extends React.Component<Props, State> {
  state = {
    isPlaying: false,
  }

  togglePlayState = (): void => {
    this.setState(prevState => ({
      isPlaying: !prevState.isPlaying,
    }));
  }

  render() {
    return (
      <Button onClick={this.togglePlayState}>
        {this.state.isPlaying ? 'Stop' : 'Play'}
      </Button>
    );
  }
}

export default MainButton;

const Button = styled.button`
  background: lightseagreen;
  border: none;
  border-radius: 5px;
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  font-size: 3em;
  cursor: pointer;
  box-shadow: 1px 3px 4px seagreen;
  outline: none;

  :hover {
  };

  :active {
    box-shadow: 1px 2px 2px seagreen;
  };
`;
