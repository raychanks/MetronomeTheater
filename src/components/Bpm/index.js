// @flow
import * as React from 'react';

import MainButton from './MainButton';
import BpmDisplay from './BpmDisplay';
import SoundComponent from './Sound';

type Props = {};
type State = {
  beatsPerMinute: number,
  shouldPlayAccent: boolean,
  shouldPlayBeat: boolean,
  intervalId: ?IntervalID,
  counter: number,
  isPlaying: boolean,
};

class Bpm extends React.Component<Props, State> {
  state = {
    intervalId: null,
    beatsPerMinute: 90,
    shouldPlayAccent: true,
    shouldPlayBeat: false,
    counter: 0,
    isPlaying: false,
  }

  componentWillUnmount() {
    this.state.intervalId ? clearInterval(this.state.intervalId) : null;
  }

  togglePlayState = (): void => {
    // use the counter to trigger updates of the Sound component
    if (this.state.isPlaying) {
      this.state.intervalId ? clearInterval(this.state.intervalId) : null;

      this.setState({
        intervalId: null,
        isPlaying: false,
      });
    } else {
      // one minute in ms divided by beatsPerMinute
      const repeatInterval = 60000 / this.state.beatsPerMinute;
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

  incrementBpm = (): void => {
    if (this.state.beatsPerMinute < 300) {
      this.setState(prevState => ({
        beatsPerMinute: prevState.beatsPerMinute + 1,
      }));
    }
  }

  decrementBpm = (): void => {
    if (this.state.beatsPerMinute > 20) {
      this.setState(prevState => ({
        beatsPerMinute: prevState.beatsPerMinute - 1,
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
    // limit bpm to lie between 20 and 300
    const { beatsPerMinute } = this.state;

    if (beatsPerMinute < 20) {
      this.setState({ beatsPerMinute: 20 });
    }

    if (beatsPerMinute > 300) {
      this.setState({ beatsPerMinute: 300 });
    }
  }

  render() {
    const {
      beatsPerMinute,
      counter,
      isPlaying,
    } = this.state;

    console.log(this.state.counter, this.state.isPlaying)

    return (
      <div>
        <MainButton
          togglePlayState={this.togglePlayState}
          isPlaying={isPlaying}
        />

        <BpmDisplay
          beatsPerMinute={beatsPerMinute}
          increment={this.incrementBpm}
          decrement={this.decrementBpm}
          onChangeBpmInput={this.onChangeBpmInput}
          onBlurBpmInput={this.onBlurBpmInput}
        />
        <SoundComponent
          shouldPlayAccent={isPlaying}
          shouldPlayBeat={false}
          counter={counter}
        />
      </div>
    );
  }
}

export default Bpm;
