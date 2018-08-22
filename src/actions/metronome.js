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

type Action = {
  type: string,
};
type Dispatch = (action: Action | ThunkAction) => any;
type ThunkAction = (dispatch: Dispatch) => any;

export const togglePlayState = (
  intervalId: ?IntervalID,
  isPlaying: boolean,
  beatsPerMinute: number,
): ThunkAction => dispatch => {
  // use the counter to trigger updates of the Sound component
  if (isPlaying) {
    // stop metronome
    intervalId ? clearInterval(intervalId) : null;

    dispatch({ type: STOP_METRONOME });
  } else {
    // start metronome
    // one minute in ms divided by beatsPerMinute
    const repeatInterval = 60000 / beatsPerMinute;
    const intervalId = setInterval(() => {
      dispatch({ type: METRONOME_TICKS });
    }, repeatInterval);

    dispatch({
      type: START_METRONOME,
      intervalId,
    });
  }
};

export const increment = (name: string, beatsPerMinute: number) => {
  if (name === 'beatsPerMinute' && beatsPerMinute < 440) {
    return { type: INCREMENT_BPM };
  }

  if (name === 'accentInterval') {
    return { type: INCREMENT_ACCENT_INTERVAL };
  }
};

export const decrement = (
  name: string,
  beatsPerMinute: number,
  accentInterval: number,
) => {
  if (name === 'beatsPerMinute' && beatsPerMinute > 20) {
    return { type: DECREMENT_BPM };
  }

  if (name === 'accentInterval' && accentInterval > 0) {
    return { type: DECREMENT_ACCENT_INTERVAL };
  }
};

export const changeAccentInterval = (event: SyntheticInputEvent<HTMLInputElement>) => {
  const value = Number(event.currentTarget.value);

  return {
    type: CHANGE_ACCENT_INTERVAL,
    value,
  };
};

export const changeBpmInput = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
  const value = Number(event.currentTarget.value);

  if (!isNaN(value)) {
    return { type: CHANGE_BPM_INPUT, value };
  }
};

export const validateBpmInput = (event: SyntheticFocusEvent<HTMLInputElement>) => {
  return {
    type: VALIDATE_BPM_INPUT,
    beatsPerMinute: Number(event.currentTarget.value),
  };
};
