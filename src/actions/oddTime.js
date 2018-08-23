// @flow
import {
  ODD_TIME_BPM_INPUT,
  ODD_TIME_ACCENT_INPUT,
  ODD_TIME_DURATION_INPUT,
  ADD_ODD_TIME_ITEM,
  REMOVE_ODD_TIME_ITEM,
  START_ODD_TIME_METRONOME,
  STOP_ODD_TIME_METRONOME,
  ODD_TIME_METRONOME_TICKS,
  CHANGE_ODD_TIME_SPEED_FACTOR,
} from '../constants/actionTypes';

import type {
  ODD_TIME_BPM_INPUT_TYPE,
  ODD_TIME_ACCENT_INPUT_TYPE,
  ODD_TIME_DURATION_INPUT_TYPE,
  ADD_ODD_TIME_ITEM_TYPE,
  REMOVE_ODD_TIME_ITEM_TYPE,
  START_ODD_TIME_METRONOME_TYPE,
  STOP_ODD_TIME_METRONOME_TYPE,
  ODD_TIME_METRONOME_TICKS_TYPE,
  CHANGE_ODD_TIME_SPEED_FACTOR_TYPE,
  State,
} from '../constants/flowTypes';



type Action =
  | { type: ODD_TIME_BPM_INPUT_TYPE, id: number, value: number }
  | { type: ODD_TIME_ACCENT_INPUT_TYPE, id: number, value: number }
  | { type: ODD_TIME_DURATION_INPUT_TYPE, id: number, value: number }
  | { type: ADD_ODD_TIME_ITEM_TYPE }
  | { type: REMOVE_ODD_TIME_ITEM_TYPE, id: number }
  | { type: START_ODD_TIME_METRONOME_TYPE }
  | { type: STOP_ODD_TIME_METRONOME_TYPE }
  | { type: ODD_TIME_METRONOME_TICKS_TYPE, currentId: number, counter: number }
  | { type: CHANGE_ODD_TIME_SPEED_FACTOR_TYPE, value: number };

type GetState = () => State;
type Dispatch = (action: Action | ThunkAction) => any;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type IntervalWrapperItem = {
  id: number,
  bpm: number,
  accentInterval: number,
  duration: number,
};

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

export const addOddTimeItem = () => {
  return { type: ADD_ODD_TIME_ITEM };
};

export const removeOddTimeItem = (id: number) => {
  return { type: REMOVE_ODD_TIME_ITEM, id };
};

export const toggleOddTimePlayState = (): ThunkAction => (dispatch, getState) => {
  const { isPlaying, intervalId, oddTimeItems } = getState().oddTime;

  if (isPlaying) {
    intervalId ? clearInterval(intervalId) : null;
    dispatch({ type: STOP_ODD_TIME_METRONOME });
  } else {
    dispatch({
      type: START_ODD_TIME_METRONOME,
    });

    const oddTimeItemsArr = Object.values(oddTimeItems);
    const intervalWrapper = (
      item: IntervalWrapperItem,
      idx: number,
      ms: number,
    ) => () => new Promise((resolve, reject) => {
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

    const dataFunc = oddTimeItemsArr.map((
      item: any,
      idx: number,
    ) => {
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

export const changeSpeedFactor = (event: SyntheticInputEvent<HTMLInputElement>) => {
  const value = Number(event.currentTarget.value);

  return { type: CHANGE_ODD_TIME_SPEED_FACTOR, value };
};
