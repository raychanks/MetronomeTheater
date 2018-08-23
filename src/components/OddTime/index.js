// @flow
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import CustomTimeSignatureList from './CustomTimeSignatureList';
import SoundComponent from '../Bpm/Sound';
import StartButton from './StartButton';
import {
  toggleOddTime,
  addOddTimeItem,
  toggleOddTimePlayState,
} from '../../actions/oddTime';

type Props = {
  toggleOddTime: () => mixed,
  addOddTimeItem: () => mixed,
};

class OddTime extends React.Component<Props> {
  toggleOddTimePlayStateWrapper = () => {
    const {
      intervalId,
      isPlaying,
      oddTimeItems,
    } = this.props.oddTime;
    const oddTimeItemsArr = Object.values(oddTimeItems);

    this.props.toggleOddTimePlayState(intervalId, isPlaying, oddTimeItemsArr);
  }

  render() {
    const {
      isPlaying,
      counter,
      currentId,
      oddTimeItems,
    } = this.props.oddTime;
    const accentInterval = oddTimeItems[currentId]
      ? oddTimeItems[currentId].accentInterval
      : 1;
    const playBeat = isPlaying && counter % accentInterval !== 0;
    const playAccent = isPlaying && counter % accentInterval === 0;

    return (
      <Container>
        <StartButton
          isPlaying={isPlaying}
          togglePlayState={this.toggleOddTimePlayStateWrapper}
        />

        <Header>
          <HeaderText>BPM</HeaderText>
          <HeaderText>Accent Interval</HeaderText>
          <HeaderText>No. of measures</HeaderText>
          <Button onClick={this.props.addOddTimeItem}>
            +
          </Button>
        </Header>

        <CustomTimeSignatureList />

        <SoundComponent
          shouldPlayAccent={playAccent}
          shouldPlayBeat={playBeat}
          counter={counter}
        />
      </Container>
    );
  }
}

function mapStateToProps({ oddTime }) {
  return { oddTime };
}

export default connect(mapStateToProps, {
  toggleOddTime,
  addOddTimeItem,
  toggleOddTimePlayState,
})(OddTime);

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  grid-template-rows: 230px;
  grid-area: timer;
  align-self: start;
  justify-items: center;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 90px 90px 90px 40px;
  grid-gap: 10px;
  align-items: center;
  justify-items: center;
`;

const HeaderText = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  margin: 0;
  text-align: center;
  color: steelblue;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  margin: 5px;
  border: none;
  border-radius: 50%;
  background: none;
  font-size: 1.2em;
  cursor: pointer;
  outline: none;
  color: steelblue;
  user-select: none;

  :hover {
    background: #ddd;
  };
`;
