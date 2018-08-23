import filter from 'lodash/filter';

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

// const tempo = 360;
// const tempo2 = 220;

const INITIAL_STATE = {
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
    // '3': {
    //   id: 3,
    //   bpm: tempo,
    //   accentInterval: 5,
    //   duration: 1,
    // },
    // '4': {
    //   id: 4,
    //   bpm: tempo,
    //   accentInterval: 7,
    //   duration: 1,
    // },
    // '5': {
    //   id: 5,
    //   bpm: tempo,
    //   accentInterval: 5,
    //   duration: 2,
    // },
    // '6': {
    //   id: 6,
    //   bpm: tempo,
    //   accentInterval: 7,
    //   duration: 1,
    // },
    // '7': {
    //   id: 7,
    //   bpm: tempo,
    //   accentInterval: 4,
    //   duration: 2,
    // },
    // '8': {
    //   id: 8,
    //   bpm: tempo,
    //   accentInterval: 3,
    //   duration: 1,
    // },
    // '9': {
    //   id: 9,
    //   bpm: tempo,
    //   accentInterval: 4,
    //   duration: 2,
    // },
    // '10': {
    //   id: 10,
    //   bpm: tempo,
    //   accentInterval: 3,
    //   duration: 1,
    // },
    // // second line
    // '11': {
    //   id: 11,
    //   bpm: tempo2,
    //   accentInterval: 8,
    //   duration: 1,
    // },
    // '12': {
    //   id: 12,
    //   bpm: tempo2,
    //   accentInterval: 7,
    //   duration: 1,
    // },
    // '13': {
    //   id: 13,
    //   bpm: tempo2,
    //   accentInterval: 6,
    //   duration: 2,
    // },
    // '14': {
    //   id: 14,
    //   bpm: tempo2,
    //   accentInterval: 8,
    //   duration: 1,
    // },
    // '15': {
    //   id: 15,
    //   bpm: tempo2,
    //   accentInterval: 7,
    //   duration: 1,
    // },
    // // third line
    // '16': {
    //   id: 16,
    //   bpm: tempo,
    //   accentInterval: 6,
    //   duration: 1,
    // },
    // '17': {
    //   id: 17,
    //   bpm: tempo,
    //   accentInterval: 3,
    //   duration: 1,
    // },
    // '18': {
    //   id: 18,
    //   bpm: tempo,
    //   accentInterval: 6,
    //   duration: 2,
    // },
    // '19': {
    //   id: 19,
    //   bpm: tempo,
    //   accentInterval: 3,
    //   duration: 3,
    // },
    // '20': {
    //   id: 20,
    //   bpm: tempo,
    //   accentInterval: 6,
    //   duration: 1,
    // },
    // '21': {
    //   id: 21,
    //   bpm: tempo,
    //   accentInterval: 3,
    //   duration: 1,
    // },
    // '22': {
    //   id: 22,
    //   bpm: tempo,
    //   accentInterval: 6,
    //   duration: 1,
    // },
    // '23': {
    //   id: 23,
    //   bpm: tempo,
    //   accentInterval: 5,
    //   duration: 3,
    // },
    // '24': {
    //   id: 24,
    //   bpm: tempo,
    //   accentInterval: 3,
    //   duration: 1,
    // },
    // '25': {
    //   id: 25,
    //   bpm: tempo,
    //   accentInterval: 4,
    //   duration: 1,
    // },
    // '26': {
    //   id: 26,
    //   bpm: tempo,
    //   accentInterval: 3,
    //   duration: 1,
    // },
  },
  isOddTimeEnabled: false,
  nextId: 3,
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
    const oddTimeItems = filter(state.oddTimeItems, item => {
      return item.id !== action.id;
    });

    return { ...state, oddTimeItems };
  }

  default:
    return state;
  }
}
