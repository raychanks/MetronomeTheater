// @flow
import * as React from 'react';

import BpmDisplay from './BpmDisplay';
import SoundComponent from './Sound';

type Props = {};
type State = {
  beatsPerMinute: number,
  shouldPlayAccent: boolean,
  shouldPlayBeat: boolean,
  intervalId: ?IntervalID,
};

class Bpm extends React.Component<Props, State> {
  state = {
    intervalId: null,
    beatsPerMinute: 90,
    shouldPlayAccent: true,
    shouldPlayBeat: false,
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.setState({
        shouldPlayAccent: false,
      });
    }, 300);

    this.setState({ intervalId });
  }

  componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
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
    const { beatsPerMinute } = this.state;

    return (
      <div>
        <BpmDisplay
          beatsPerMinute={beatsPerMinute}
          increment={this.incrementBpm}
          decrement={this.decrementBpm}
          onChangeBpmInput={this.onChangeBpmInput}
          onBlurBpmInput={this.onBlurBpmInput}
        />
        <SoundComponent
          shouldPlayAccent={true}
          shouldPlayBeat={false}
        />
      </div>
    );
  }
}

export default Bpm;
