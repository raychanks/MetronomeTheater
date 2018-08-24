// @flow
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Bpm from './Bpm';
import Header from './Header';
import OddTime from './OddTime';
import { togglePlayState } from '../actions/metronome';
import { toggleOddTimePlayState } from '../actions/oddTime';

type Props = {
  toggleOddTimePlayState: () => any,
  togglePlayState: () => any,
  oddTimePlaying: boolean,
  classicPlaying: boolean,
};
type State = {
  useSimpleMetronome: boolean,
};

class App extends React.Component<Props, State> {
  state = {
    useSimpleMetronome: true,
  }

  toggleMetronomeMode = from => () => {
    if (from === 'basic') {
      if (this.props.oddTimePlaying) {
        this.props.toggleOddTimePlayState();
      }

      this.setState({
        useSimpleMetronome: true,
      });
    } else {
      if (this.props.classicPlaying) {
        this.props.togglePlayState();
      }

      this.setState({
        useSimpleMetronome: false,
      });
    }
  }

  render() {
    return (
      <Container>
        <Header
          useSimpleMetronome={this.state.useSimpleMetronome}
          toggleMetronomeMode={this.toggleMetronomeMode}
        />

        {this.state.useSimpleMetronome ? (
          <Bpm />
        ) : (
          <OddTime />
        )}
      </Container>
    );
  }
}

function mapStateToProps({ metronome, oddTime }) {
  return {
    classicPlaying: metronome.isPlaying,
    oddTimePlaying: oddTime.isPlaying,
  };
}

export default connect(mapStateToProps, {
  toggleOddTimePlayState,
  togglePlayState
})(App);

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'timer';
  grid-gap: 20px;
  margin: 10px auto;
  align-items: center;
  width: 420px;
`;
