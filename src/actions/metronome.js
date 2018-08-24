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
  StartMetronomeAction,
  StopMetronomeAction,
  MetronomeTicksAction,
  IncrementBpmAction,
  IncrementAccentIntervalAction,
  DecrementBpmAction,
  DecrementAccentIntervalAction,
  ChangeAccentIntervalAction,
  ChangeBpmInputAction,
  ValidateBpmInputAction,
  ChangeSpeedFactorAction,
  ValidateSpeedFactorAction,
  State,
} from '../constants/flowTypes';

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

type GetState = () => State;
type Dispatch = (action: Action | ThunkAction) => any;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export const togglePlayState = (): ThunkAction => (dispatch, getState): void => {
  const { intervalId, isPlaying, beatsPerMinute, speedFactor } = getState().metronome;

  // use the counter to trigger updates of the Sound component
  if (isPlaying) {
    // stop metronome
    intervalId ? clearInterval(intervalId) : null;

    dispatch({ type: STOP_METRONOME });
  } else {
    // start metronome
    // one minute in ms divided by beatsPerMinute
    const repeatInterval = 60000 / (beatsPerMinute * speedFactor / 100);
    const intervalId = setInterval(() => {
      dispatch({ type: METRONOME_TICKS });
    }, repeatInterval);

    dispatch({
      type: START_METRONOME,
      intervalId,
    });
  }
};

export const increment = (name: string): ThunkAction => (dispatch, getState): void => {
  const { beatsPerMinute } = getState().metronome;

  if (name === 'beatsPerMinute' && beatsPerMinute < 440) {
    dispatch({ type: INCREMENT_BPM });
  }

  if (name === 'accentInterval') {
    dispatch({ type: INCREMENT_ACCENT_INTERVAL });
  }
};

export const decrement = (name: string): ThunkAction => (dispatch, getState): void => {
  const { beatsPerMinute, accentInterval } = getState().metronome;

  if (name === 'beatsPerMinute' && beatsPerMinute > 20) {
    dispatch({ type: DECREMENT_BPM });
  }

  if (name === 'accentInterval' && accentInterval > 0) {
    dispatch({ type: DECREMENT_ACCENT_INTERVAL });
  }
};

export const changeAccentInterval = (
  event: SyntheticInputEvent<HTMLInputElement>
): ChangeAccentIntervalAction => {
  const value = Number(event.currentTarget.value);

  return {
    type: CHANGE_ACCENT_INTERVAL,
    value,
  };
};

export const changeBpmInput = (
  event: SyntheticKeyboardEvent<HTMLInputElement>
): ChangeBpmInputAction | void => {
  const value = Number(event.currentTarget.value);

  if (!isNaN(value)) {
    return { type: CHANGE_BPM_INPUT, value };
  }
};

export const validateBpmInput = (
  event: SyntheticFocusEvent<HTMLInputElement>
): ValidateBpmInputAction => {
  return {
    type: VALIDATE_BPM_INPUT,
    beatsPerMinute: Number(event.currentTarget.value),
  };
};

export const changeSpeedFactor = (
  event: SyntheticFocusEvent<HTMLInputElement>
): ChangeSpeedFactorAction => {
  return {
    type: CHANGE_SPEED_FACTOR,
    speedFactor: Number(event.currentTarget.value),
  };
};

export const validateSpeedFactor = (
  event: SyntheticFocusEvent<HTMLInputElement>
): ValidateSpeedFactorAction => {
  return {
    type: VALIDATE_SPEED_FACTOR,
    speedFactor: Number(event.currentTarget.value),
  };
};
