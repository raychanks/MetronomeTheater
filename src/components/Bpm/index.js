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
    } = this.props.metronome;

    const playBeat = isPlaying && counter % accentInterval !== 0;
    const playAccent = isPlaying && counter % accentInterval === 0;

    return (
      <Container>
        <MainButton
          togglePlayState={this.togglePlayState}
          isPlaying={isPlaying}
        />

        <AccentIntervalSelector
          accentInterval={accentInterval}
          increment={this.increment('accentInterval')}
          decrement={this.decrement('accentInterval')}
          onChangeAccentInterval={this.props.changeAccentInterval}
        />

        <BpmDisplay
          beatsPerMinute={beatsPerMinute}
          increment={this.increment('beatsPerMinute')}
          decrement={this.decrement('beatsPerMinute')}
          onChangeBpmInput={this.props.changeBpmInput}
          onBlurBpmInput={this.props.validateBpmInput}
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
})(Bpm);

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-area: basic;
`;
