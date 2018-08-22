import _ from 'lodash';

import {
  ODD_TIME_BPM_INPUT,
  ODD_TIME_ACCENT_INPUT,
  ODD_TIME_DURATION_INPUT,
  TOGGLE_ODD_TIME,
  ADD_ODD_TIME_ITEM,
  REMOVE_ODD_TIME_ITEM,
} from '../constants/actionTypes';

const INITIAL_STATE = {
  oddTimeItems: {
    '1': {
      id: 1,
      bpm: 90,
      accentInterval: 4,
      duration: 4,
    },
  },
  isOddTimeEnabled: false,
  nextId: 2,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case ODD_TIME_BPM_INPUT: {
    const oddTimeItem = { ...state.oddTimeItems[action.id], bpm: action.value };
    const oddTimeItems = { ...state.oddTimeItems, [action.id]: oddTimeItem };

    return { ...state, oddTimeItems };
  }

  case ODD_TIME_ACCENT_INPUT: {
    const oddTimeItem = { ...state.oddTimeItems[action.id], accentInterval: action.value };
    const oddTimeItems = { ...state.oddTimeItems, [action.id]: oddTimeItem };

    return { ...state, oddTimeItems };
  }

  case ODD_TIME_DURATION_INPUT: {
    const oddTimeItem = { ...state.oddTimeItems[action.id], duration: action.value };
    const oddTimeItems = { ...state.oddTimeItems, [action.id]: oddTimeItem };

    return { ...state, oddTimeItems };
  }

  case TOGGLE_ODD_TIME:
    return { ...state, isOddTimeEnabled: !state.isOddTimeEnabled };

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
    const oddTimeItems = _.filter(state.oddTimeItems, item => {
      return item.id !== action.id;
    });

    return { ...state, oddTimeItems };
  }

  default:
    return state;
  }
}
