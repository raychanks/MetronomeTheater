// @flow
import {
  ODD_TIME_BPM_INPUT,
  ODD_TIME_ACCENT_INPUT,
  ODD_TIME_DURATION_INPUT,
  TOGGLE_ODD_TIME,
  ADD_ODD_TIME_ITEM,
  REMOVE_ODD_TIME_ITEM,
  START_ODD_TIME_METRONOME,
  STOP_ODD_TIME_METRONOME,
  ODD_TIME_METRONOME_TICKS,
} from '../constants/actionTypes';

export const oddTimeBpmInput = (
  id: number,
  value: number,
) => {
  return {
    type: ODD_TIME_BPM_INPUT,
    id,
    value,
  };
};

export const oddTimeAccentInput = (
  id: number,
  value: number,
) => {
  return {
    type: ODD_TIME_ACCENT_INPUT,
    id,
    value,
  };
};

export const oddTimeDurationInput = (
  id: number,
  value: number,
) => {
  return {
    type: ODD_TIME_DURATION_INPUT,
    id,
    value,
  };
};

export const toggleOddTime = () => {
  return { type: TOGGLE_ODD_TIME };
};

export const addOddTimeItem = () => {
  return { type: ADD_ODD_TIME_ITEM };
};

export const removeOddTimeItem = id => {
  return { type: REMOVE_ODD_TIME_ITEM, id };
};

export const toggleOddTimePlayState = () => (dispatch, getState) => {
  const { isPlaying, intervalId, oddTimeItems } = getState().oddTime;

  if (isPlaying) {
    intervalId ? clearInterval(intervalId) : null;
    dispatch({ type: STOP_ODD_TIME_METRONOME });
  } else {
    dispatch({
      type: START_ODD_TIME_METRONOME,
    });

    const oddTimeItemsArr = Object.values(oddTimeItems);
    const intervalWrapper = (item, idx, ms) => () => new Promise((resolve, reject) => {
      let counter = 0;

      if (idx !== 0 && item.accentInterval * item.duration !== 0) {
        dispatch({
          type: ODD_TIME_METRONOME_TICKS,
          currentId: item.id,
          counter: counter,
        });
      }

      const intervalId = setInterval(() => {
        if (!getState().oddTime.isPlaying) {
          reject(intervalId);
        }

        if (item.accentInterval * item.duration > counter + 1) {
          dispatch({
            type: ODD_TIME_METRONOME_TICKS,
            currentId: item.id,
            counter: counter + 1,
          });

          counter++;
        } else {
          clearInterval(intervalId);

          if (idx < oddTimeItemsArr.length - 1) {
            resolve();
          } else {
            dispatch({ type: STOP_ODD_TIME_METRONOME });
          }
        }
      }, ms);
    });

    const dataFunc = oddTimeItemsArr.map((item, idx) => {
      const repeatInterval = 60000 / item.bpm;

      return intervalWrapper(item, idx, repeatInterval);
    });


    dataFunc.reduce((acc, func) => {
      return acc.then(func);
    }, Promise.resolve())
      .catch(intervalId => {
        clearInterval(intervalId);
        dispatch({ type: STOP_ODD_TIME_METRONOME });
      });
  }
};
