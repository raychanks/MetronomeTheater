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
  CHANGE_SPEED_FACTOR,
  VALIDATE_SPEED_FACTOR,
} from '../constants/actionTypes';

import type {
  STOP_METRONOME_TYPE,
  CHANGE_SPEED_FACTOR_TYPE,
  VALIDATE_SPEED_FACTOR_TYPE,
  MetronomeState,
} from '../constants/flowTypes';

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
type ChangeSpeedFactorAction = { type: CHANGE_SPEED_FACTOR_TYPE, speedFactor: number };
type ValidateSpeedFactorAction = { type: VALIDATE_SPEED_FACTOR_TYPE, speedFactor: number };

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
  | ValidateBpmInputAction
  | ChangeSpeedFactorAction
  | ValidateSpeedFactorAction;

const INITIAL_STATE: MetronomeState = {
  intervalId: null,
  beatsPerMinute: 90,
  counter: 0,
  isPlaying: false,
  accentInterval: 4,
  speedFactor: 100,
};

export default function (state: MetronomeState = INITIAL_STATE, action: Action) {
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

    return state;
  }

  case CHANGE_SPEED_FACTOR: {
    if (!isNaN(action.speedFactor)) {
      return { ...state, speedFactor: action.speedFactor };
    }

    return state;
  }

  case VALIDATE_SPEED_FACTOR: {
    if (action.speedFactor <= 30) {
      return { ...state, speedFactor: 30 };
    } else if (action.speedFactor >= 150) {
      return { ...state, speedFactor: 150 };
    } else {
      return state;
    }
  }

  default:
    return state;
  }
}
