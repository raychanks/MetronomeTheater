import _ from 'lodash';

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

const tempo = 300;

const INITIAL_STATE = {
  oddTimeItems: {
    '1': {
      id: 1,
      bpm: tempo,
      accentInterval: 5,
      duration: 2,
    },
    '2': {
      id: 2,
      bpm: tempo,
      accentInterval: 7,
      duration: 1,
    },
    '3': {
      id: 3,
      bpm: tempo,
      accentInterval: 5,
      duration: 1,
    },
    '4': {
      id: 4,
      bpm: tempo,
      accentInterval: 7,
      duration: 1,
    },
    '5': {
      id: 5,
      bpm: tempo,
      accentInterval: 5,
      duration: 2,
    },
    '6': {
      id: 6,
      bpm: tempo,
      accentInterval: 7,
      duration: 1,
    },
    '7': {
      id: 7,
      bpm: tempo,
      accentInterval: 4,
      duration: 2,
    },
    '8': {
      id: 8,
      bpm: tempo,
      accentInterval: 3,
      duration: 1,
    },
    '9': {
      id: 9,
      bpm: tempo,
      accentInterval: 4,
      duration: 2,
    },
    '10': {
      id: 10,
      bpm: tempo,
      accentInterval: 3,
      duration: 1,
    },
  },
  isOddTimeEnabled: false,
  nextId: 2,
  currentId: 1,
  counter: 0,
  intervalId: null,
  isPlaying: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case START_ODD_TIME_METRONOME: {
    return { ...state, isPlaying: true };
  }

  case STOP_ODD_TIME_METRONOME:
    return { ...state, intervalId: null, isPlaying: false, counter: 0 };

  case ODD_TIME_METRONOME_TICKS:
    return {
      ...state,
      currentId: action.currentId,
      counter: action.counter,
    };

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
