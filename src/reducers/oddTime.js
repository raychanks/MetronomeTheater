// @flow
import filter from 'lodash/filter';

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
  LOAD_ODD_TIME_TEMPLATE,
} from '../constants/actionTypes';

import type {
  OddTimeState,
  OddTimeAction,
} from '../constants/flowTypes';

const INITIAL_STATE: OddTimeState = {
  oddTimeItems: {
    '1': {
      id: 1,
      bpm: 240,
      accentInterval: 3,
      duration: 2,
    },
    '2': {
      id: 2,
      bpm: 90,
      accentInterval: 2,
      duration: 3,
    },
  },
  nextId: 3,
  currentId: 1,
  counter: 0,
  intervalId: null,
  isPlaying: false,
  speedFactor: 100,
};

export default function (state: OddTimeState = INITIAL_STATE, action: OddTimeAction) {
  switch (action.type) {
  case START_ODD_TIME_METRONOME: {
    return { ...state, isPlaying: true };
  }

  case STOP_ODD_TIME_METRONOME: {
    const oddTimeItemsArr = Object.values(state.oddTimeItems);
    let currentId = 0;

    if (oddTimeItemsArr[0] && oddTimeItemsArr[0].id) {
      currentId = oddTimeItemsArr[0].id;
    }

    return {
      ...state,
      currentId,
      intervalId: null,
      isPlaying: false,
      counter: 0,
    };
  }

  case ODD_TIME_METRONOME_TICKS:
    return {
      ...state,
      currentId: action.currentId,
      counter: action.counter,
    };

  case ODD_TIME_BPM_INPUT: {
    if (isNaN(action.value)) {
      return state;
    }

    const oddTimeItem = { ...state.oddTimeItems[action.id], bpm: action.value };
    const oddTimeItems = { ...state.oddTimeItems, [action.id]: oddTimeItem };

    return { ...state, oddTimeItems };
  }

  case VALIDATE_ODD_TIME_BPM_INPUT: {
    let validatedBpm = action.bpm;

    if (action.bpm < 20) {
      validatedBpm = 20;
    }

    if (action.bpm > 440) {
      validatedBpm = 440;
    }

    const oddTimeItem = { ...state.oddTimeItems[action.id], bpm: validatedBpm };
    const oddTimeItems = { ...state.oddTimeItems, [action.id]: oddTimeItem };

    return { ...state, oddTimeItems };
  }

  case ODD_TIME_ACCENT_INPUT: {
    if (isNaN(action.value)) {
      return state;
    }

    const oddTimeItem = { ...state.oddTimeItems[action.id], accentInterval: action.value };
    const oddTimeItems = { ...state.oddTimeItems, [action.id]: oddTimeItem };

    return { ...state, oddTimeItems };
  }

  case ODD_TIME_DURATION_INPUT: {
    if (isNaN(action.value)) {
      return state;
    }

    const oddTimeItem = { ...state.oddTimeItems[action.id], duration: action.value };
    const oddTimeItems = { ...state.oddTimeItems, [action.id]: oddTimeItem };

    return { ...state, oddTimeItems };
  }

  case ADD_ODD_TIME_ITEM: {
    const id = state.nextId;
    const newItem = {
      id,
      bpm: 90,
      accentInterval: 4,
      duration: 4,
    };

    return {
      ...state,
      oddTimeItems: { ...state.oddTimeItems, [id]: newItem },
      nextId: id + 1,
    };
  }

  case REMOVE_ODD_TIME_ITEM: {
    const id = action.id;
    const oddTimeItems = {};
    const oddTimeItemsArr = filter(state.oddTimeItems, item => {
      return item.id !== id;
    });

    oddTimeItemsArr.forEach(item => {
      oddTimeItems[item.id] = item;
    });

    return { ...state, oddTimeItems };
  }

  case CHANGE_ODD_TIME_SPEED_FACTOR: {
    if (!isNaN(action.value)) {
      return { ...state, speedFactor: action.value };
    }

    return state;
  }

  case VALIDATE_ODD_TIME_SPEED_FACTOR: {
    if (action.value <= 30) {
      return { ...state, speedFactor: 30 };
    } else if (action.value >= 150) {
      return { ...state, speedFactor: 150 };
    } else {
      return state;
    }
  }

  case LOAD_ODD_TIME_TEMPLATE: {
    // validate the object obtained from localStorage
    const ObjectKeysAreValid = Object.keys(action.oddTimeTemplate)
      .every(key => {
        return !isNaN(key);
      });
    const ObjectValuesAreValid = Object.values(action.oddTimeTemplate)
      .every(item => {
        return (
          Object.keys(item).length === 4
          && typeof item.id === 'number'
          && typeof item.bpm === 'number'
          && typeof item.accentInterval === 'number'
          && typeof item.duration === 'number'
        );
      });

    if (ObjectKeysAreValid && ObjectValuesAreValid) {
      return {
        ...state,
        oddTimeItems: action.oddTimeTemplate,
        speedFactor: 100,
      };
    }

    return state;
  }

  default:
    return state;
  }
}
