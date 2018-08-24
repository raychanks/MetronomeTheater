import React from 'react';
import styled from 'styled-components';

import Bpm from './Bpm';
import Header from './Header';
import OddTime from './OddTime';

class App extends React.Component {
  state = {
    useSimpleMetronome: true,
  }

  toggleMetronomeMode = from => () => {
    if (from === 'basic') {
      this.setState({
        useSimpleMetronome: true,
      });
    } else {
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

export default App;

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
