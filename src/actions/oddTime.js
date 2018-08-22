// @flow
import {
  ODD_TIME_BPM_INPUT,
  ODD_TIME_ACCENT_INPUT,
  ODD_TIME_DURATION_INPUT,
  TOGGLE_ODD_TIME,
  ADD_ODD_TIME_ITEM,
  REMOVE_ODD_TIME_ITEM,
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
