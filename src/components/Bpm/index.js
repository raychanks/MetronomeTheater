// @flow
import * as React from 'react';
import styled from 'styled-components';

import MainButton from './MainButton';
import BpmDisplay from './BpmDisplay';
import SoundComponent from './Sound';
import AccentIntervalSelector from './AccentIntervalSelector';

type Props = {};
type State = {
  intervalId: ?IntervalID,
  beatsPerMinute: number,
  counter: number,
  isPlaying: boolean,
  accentInterval: number,
};

class Bpm extends React.Component<Props, State> {
  state = {
    intervalId: null,
    beatsPerMinute: 90,
    counter: 0,
    isPlaying: false,
    accentInterval: 4,
  }

  componentWillUnmount() {
    this.state.intervalId ? clearInterval(this.state.intervalId) : null;
  }

  togglePlayState = (): void => {
    // use the counter to trigger updates of the Sound component
    if (this.state.isPlaying) {
      // stop metronome
      this.state.intervalId ? clearInterval(this.state.intervalId) : null;

      this.setState({
        intervalId: null,
        isPlaying: false,
        counter: 0,
      });
    } else {
      // start metronome
      // one minute in ms divided by beatsPerMinute
      const { beatsPerMinute } = this.state;
      const repeatInterval = 60000 / beatsPerMinute;
      const intervalId = setInterval(() => {
        this.setState(prevState => ({
          counter: prevState.counter + 1,
        }));
      }, repeatInterval);

      this.setState({
        intervalId,
        isPlaying: true,
      });
    }
  }

  incrementBpm = (name: string) => (): void => {
    if (name === 'beatsPerMinute' && this.state.beatsPerMinute < 440) {
      this.setState(prevState => ({
        beatsPerMinute: prevState.beatsPerMinute + 1,
      }));
    }

    if (name === 'accentInterval') {
      this.setState(prevState => ({
        accentInterval: prevState.accentInterval + 1,
      }));
    }
  }

  decrementBpm = (name: string) => (): void => {
    if (name === 'beatsPerMinute' && this.state.beatsPerMinute > 20) {
      this.setState(prevState => ({
        beatsPerMinute: prevState.beatsPerMinute - 1,
      }));
    }

    if (name === 'accentInterval' && this.state.accentInterval > 0) {
      this.setState(prevState => ({
        accentInterval: prevState.accentInterval - 1,
      }));
    }
  }

  onChangeBpmInput = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const value = Number(event.currentTarget.value);

    if (!isNaN(value)) {
      this.setState({ beatsPerMinute: value });
    }
  }

  onBlurBpmInput = (): void => {
    // limit bpm to lie between 20 and 440
    const { beatsPerMinute } = this.state;

    if (beatsPerMinute < 20) {
      this.setState({ beatsPerMinute: 20 });
    }

    if (beatsPerMinute > 440) {
      this.setState({ beatsPerMinute: 440 });
    }
  }

  onChangeAccentInterval = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);

    if (Object.is(value % 1, 0)) {
      this.setState({ accentInterval: value });
    } else {
      this.setState({ accentInterval: 0 });
    }
  }

  render() {
    const {
      beatsPerMinute,
      counter,
      isPlaying,
      accentInterval,
    } = this.state;

    console.log(counter, accentInterval)

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
          increment={this.incrementBpm('accentInterval')}
          decrement={this.decrementBpm('accentInterval')}
          onChangeAccentInterval={this.onChangeAccentInterval}
        />

        <BpmDisplay
          beatsPerMinute={beatsPerMinute}
          increment={this.incrementBpm('beatsPerMinute')}
          decrement={this.decrementBpm('beatsPerMinute')}
          onChangeBpmInput={this.onChangeBpmInput}
          onBlurBpmInput={this.onBlurBpmInput}
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

export default Bpm;

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
`;
