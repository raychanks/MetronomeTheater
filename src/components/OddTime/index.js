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
      reject,
    } = this.props.oddTime;
    const oddTimeItemsArr = Object.values(oddTimeItems);

    this.props.toggleOddTimePlayState(intervalId, isPlaying, oddTimeItemsArr, reject);
  }

  render() {
    const {
      isPlaying,
      counter,
      currentId,
      oddTimeItems,
    } = this.props.oddTime;
    const accentInterval = oddTimeItems[currentId].accentInterval;
    const playBeat = isPlaying && counter % accentInterval !== 0;
    const playAccent = isPlaying && counter % accentInterval === 0;

    return (
      <Container>
        <div>
          <OddTimeCheckBox
            id='odd-time-checkbox'
            type='checkbox'
            checked={this.props.oddTime.isOddTimeEnabled}
            onChange={this.props.toggleOddTime}
          />
          <OddTimeCheckBoxLabel htmlFor='odd-time-checkbox'>
            Odd time mode
          </OddTimeCheckBoxLabel>
        </div>

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
  grid-template-rows: 40px 200px;
  grid-auto-rows: 40px;
  grid-area: odd;
  align-self: start;
`;

const OddTimeCheckBoxLabel = styled.label`

`;

const OddTimeCheckBox = styled.input`
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

  :hover {
    background: #ddd;
  };
`;
