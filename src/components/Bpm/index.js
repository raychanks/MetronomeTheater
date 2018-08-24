// @flow
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import MainButton from './MainButton';
import BpmDisplay from './BpmDisplay';
import SoundComponent from './Sound';
import AccentIntervalSelector from './AccentIntervalSelector';
import {
  togglePlayState,
  increment,
  decrement,
  changeAccentInterval,
  changeBpmInput,
  validateBpmInput,
  changeSpeedFactor,
  validateSpeedFactor,
} from '../../actions/metronome';

type Props = {
  metronome: {
    intervalId: ?IntervalID,
    beatsPerMinute: number,
    counter: number,
    isPlaying: boolean,
    accentInterval: number,
  },
  togglePlayState: (
    intervalId: ?IntervalID,
    isPlaying: boolean,
    beatsPerMinute: number,
  ) => mixed,
  increment: (name: string, beatsPerMinute: number) => mixed,
  decrement: (name: string, beatsPerMinute: number, accentInterval: number) => mixed,
  changeAccentInterval: () => mixed,
  changeBpmInput: () => mixed,
  validateBpmInput: () => mixed,
};

class Bpm extends React.Component<Props> {
  componentWillUnmount() {
    this.props.metronome.intervalId
      ? clearInterval(this.props.metronome.intervalId)
      : null;
  }

  togglePlayState = (): void => {
    const { intervalId, isPlaying, beatsPerMinute } = this.props.metronome;

    this.props.togglePlayState(intervalId, isPlaying, beatsPerMinute);
  }

  increment = (name: string) => (): void => {
    this.props.increment(name, this.props.metronome.beatsPerMinute);
  }

  decrement = (name: string) => (): void => {
    const { beatsPerMinute, accentInterval } = this.props.metronome;

    this.props.decrement(name, beatsPerMinute, accentInterval);
  }

  render() {
    const {
      beatsPerMinute,
      counter,
      isPlaying,
      accentInterval,
      speedFactor,
    } = this.props.metronome;

    const playBeat = isPlaying && counter % accentInterval !== 0;
    const playAccent = isPlaying && counter % accentInterval === 0;

    return (
      <Container>
        <ButtonSection>
          <MainButton
            togglePlayState={this.togglePlayState}
            isPlaying={isPlaying}
          />

          <div>
            <HeaderText>Speed Factor</HeaderText>
            <HeaderText>(30% - 150%)</HeaderText>
            <NumberInput
              type='number'
              value={speedFactor}
              onChange={this.props.changeSpeedFactor}
              onBlur={this.props.validateSpeedFactor}
            />
          </div>
        </ButtonSection>

        <BpmDisplay
          beatsPerMinute={beatsPerMinute}
          increment={this.increment('beatsPerMinute')}
          decrement={this.decrement('beatsPerMinute')}
          onChangeBpmInput={this.props.changeBpmInput}
          onBlurBpmInput={this.props.validateBpmInput}
        />

        <AccentIntervalSelector
          accentInterval={accentInterval}
          increment={this.increment('accentInterval')}
          decrement={this.decrement('accentInterval')}
          onChangeAccentInterval={this.props.changeAccentInterval}
        />

        <SoundComponent
          shouldPlayAccent={playAccent}
          shouldPlayBeat={playBeat}
          counter={counter}
        />
      </Container>
    );
  }
}

function mapStateToProps({ metronome }) {
  return { metronome };
}

export default connect(mapStateToProps, {
  togglePlayState,
  increment,
  decrement,
  changeAccentInterval,
  changeBpmInput,
  validateBpmInput,
  changeSpeedFactor,
  validateSpeedFactor,
})(Bpm);

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-area: timer;
`;

const ButtonSection = styled.div`
  display: grid;
  grid-template-columns: 200px 150px;
  column-gap: 20px;
  align-items: center;
  height: 200px;
`;

const NumberInput = styled.input`
  box-sizing: border-box;
  width: 100px;
  height: 30px;
  margin: 5px 25px;
  border: 1px solid steelblue;
  border-radius: 2px;
  text-align: center;
  font-size: 1.2em;
  color: steelblue;
`;

const HeaderText = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  margin: 0;
  text-align: center;
  color: steelblue;
`;
