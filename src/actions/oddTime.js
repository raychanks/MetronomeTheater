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
  VALIDATE_ODD_TIME_SPEED_FACTOR,
  VALIDATE_ODD_TIME_BPM_INPUT,
} from '../constants/actionTypes';

import type {
  OddTimeBpmInputAction,
  OddTimeAccentInputAction,
  OddTimeDurationInputAction,
  AddOddTimeItemAction,
  RemoveOddTimeItemAction,
  ChangeOddTimeSpeedFactorAction,
  ValidateOddTimeSpeedFactorAction,
  ValidateOddTimeBpmInputAction,
  OddTimeAction,
  State,
} from '../constants/flowTypes';

type GetState = () => State;
type Dispatch = (action: OddTimeAction | ThunkAction) => any;
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
): OddTimeBpmInputAction => {
  return {
    type: ODD_TIME_BPM_INPUT,
    id,
    value,
  };
};

export const oddTimeAccentInput = (
  id: number,
  value: number,
): OddTimeAccentInputAction => {
  return {
    type: ODD_TIME_ACCENT_INPUT,
    id,
    value,
  };
};

export const oddTimeDurationInput = (
  id: number,
  value: number,
): OddTimeDurationInputAction => {
  return {
    type: ODD_TIME_DURATION_INPUT,
    id,
    value,
  };
};

export const addOddTimeItem = (): AddOddTimeItemAction => {
  return { type: ADD_ODD_TIME_ITEM };
};

export const removeOddTimeItem = (id: number): RemoveOddTimeItemAction => {
  return { type: REMOVE_ODD_TIME_ITEM, id };
};

export const toggleOddTimePlayState = (): ThunkAction => (dispatch, getState): void => {
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
      const repeatInterval = 60000 / (item.bpm * getState().oddTime.speedFactor / 100);

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

export const changeSpeedFactor = (
  event: SyntheticInputEvent<HTMLInputElement>
): ChangeOddTimeSpeedFactorAction => {
  const value = Number(event.currentTarget.value);

  return { type: CHANGE_ODD_TIME_SPEED_FACTOR, value };
};

export const validateSpeedFactor = (
  event: SyntheticInputEvent<HTMLInputElement>
): ValidateOddTimeSpeedFactorAction => {
  const value = Number(event.currentTarget.value);

  return { type: VALIDATE_ODD_TIME_SPEED_FACTOR, value };
};

export const validateBpmInput = (
  id: number, bpm: number
): ValidateOddTimeBpmInputAction => {
  return { type: VALIDATE_ODD_TIME_BPM_INPUT, bpm, id };
};
