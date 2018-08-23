// @flow
import {
  START_METRONOME,
  STOP_METRONOME,
  METRONOME_TICKS,
  INCREMENT_BPM,
  INCREMENT_ACCENT_INTERVAL,
  DECREMENT_BPM,
  DECREMENT_ACCENT_INTERVAL,
  CHANGE_ACCENT_INTERVAL,
  CHANGE_BPM_INPUT,
  VALIDATE_BPM_INPUT,
} from '../constants/actionTypes';

import type { STOP_METRONOME_TYPE } from '../constants/flowTypes';

type State = {
  +intervalId: ?IntervalID,
  +beatsPerMinute: number,
  +counter: number,
  +isPlaying: boolean,
  +accentInterval: number,
};

type StartMetronomeAction = { type: typeof START_METRONOME, intervalId: IntervalID };
type StopMetronomeAction = { type: STOP_METRONOME_TYPE };
type MetronomeTicksAction = { type: typeof METRONOME_TICKS };
type IncrementBpmAction = { type: typeof INCREMENT_BPM };
type IncrementAccentIntervalAction = { type: typeof INCREMENT_ACCENT_INTERVAL };
type DecrementBpmAction = { type: typeof DECREMENT_BPM };
type DecrementAccentIntervalAction = { type: typeof DECREMENT_ACCENT_INTERVAL };
type ChangeAccentIntervalAction = { type: typeof CHANGE_ACCENT_INTERVAL, value: number };
type ChangeBpmInputAction = { type: typeof CHANGE_BPM_INPUT, value: number };
type ValidateBpmInputAction = { type: typeof VALIDATE_BPM_INPUT, beatsPerMinute: number };

type Action =
  | StartMetronomeAction
  | StopMetronomeAction
  | MetronomeTicksAction
  | IncrementBpmAction
  | IncrementAccentIntervalAction
  | DecrementBpmAction
  | DecrementAccentIntervalAction
  | ChangeAccentIntervalAction
  | ChangeBpmInputAction
  | ValidateBpmInputAction;

const INITIAL_STATE: State = {
  intervalId: null,
  beatsPerMinute: 90,
  counter: 0,
  isPlaying: false,
  accentInterval: 4,
};

export default function (state: State = INITIAL_STATE, action: Action) {
  switch (action.type) {
  case START_METRONOME: {
    return { ...state, isPlaying: true, intervalId: action.intervalId };
  }

  case STOP_METRONOME:
    return { ...state, intervalId: null, isPlaying: false, counter: 0 };

  case METRONOME_TICKS:
    return { ...state, counter: state.counter + 1 };

  case INCREMENT_BPM:
    return { ...state, beatsPerMinute: state.beatsPerMinute + 1 };

  case INCREMENT_ACCENT_INTERVAL:
    return { ...state, accentInterval: state.accentInterval + 1 };

  case DECREMENT_BPM:
    return { ...state, beatsPerMinute: state.beatsPerMinute - 1 };

  case DECREMENT_ACCENT_INTERVAL:
    return { ...state, accentInterval: state.accentInterval - 1 };

  case CHANGE_ACCENT_INTERVAL: {
    const accentInterval = Object.is(action.value % 1, 0)
      ? action.value
      : 0;

    return { ...state, accentInterval };
  }

  case CHANGE_BPM_INPUT: {
    return { ...state, beatsPerMinute: action.value };
  }

  case VALIDATE_BPM_INPUT: {
    // limit bpm to lie between 20 and 440
    if (action.beatsPerMinute < 20) {
      return { ...state, beatsPerMinute: 20 };
    }

    if (action.beatsPerMinute > 440) {
      return { ...state, beatsPerMinute: 440 };
    }
  }

  default:
    return state;
  }
}
